import { createReadStream, existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

function parseEnvValue(value) {
  const trimmed = value.trim();
  const quote = trimmed[0];
  if ((quote === "\"" || quote === "'") && trimmed.endsWith(quote)) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadLocalEnv(fileNames) {
  const shellEnvKeys = new Set(Object.keys(process.env));
  for (const fileName of fileNames) {
    const target = join(root, fileName);
    if (!existsSync(target)) continue;

    let lines = [];
    try {
      lines = readFileSync(target, "utf8").split(/\r?\n/);
    } catch {
      continue;
    }
    for (const line of lines) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (!shellEnvKeys.has(key)) {
        process.env[key] = parseEnvValue(rawValue);
      }
    }
  }
}

loadLocalEnv([".env", ".env.local"]);

const port = Number(process.env.PORT || 8765);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".md": "text/markdown; charset=utf-8",
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function getOpenAIBaseUrl() {
  return String(process.env.OPENAI_BASE_URL || "https://api.openai.com/v1")
    .trim()
    .replace(/\/+$/, "");
}

async function readApiResponseJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {
      error: {
        message: `图像接口返回了非 JSON 响应（HTTP ${response.status}）。请检查 OPENAI_BASE_URL 是否为兼容 OpenAI Images API 的 /v1 地址。`,
        code: "non_json_response",
      },
    };
  }
}

function normalizeOpenAIImageError(error, status) {
  const message = error?.message || "OpenAI image generation failed.";
  const type = error?.type || "";
  const code = error?.code || "";
  const lower = `${message} ${type} ${code}`.toLowerCase();

  if (lower.includes("billing hard limit") || lower.includes("hard limit")) {
    return {
      error: "OpenAI 项目的账单或预算上限已达到，真实高清图没有生成。请在 Platform 中提高项目预算、切换有额度的 Project，或更换可用密钥后重启本地服务。",
      code: "billing_limit_reached",
    };
  }
  if (lower.includes("insufficient_quota") || lower.includes("quota")) {
    return {
      error: "OpenAI 项目当前额度不足，真实高清图没有生成。请确认账户余额、项目额度和用量限制后重试。",
      code: "insufficient_quota",
    };
  }
  if (status === 401 || lower.includes("invalid api key")) {
    return {
      error: "OPENAI_API_KEY 无效或没有被当前项目授权，请检查本地环境文件和 Platform 项目权限。",
      code: "invalid_api_key",
    };
  }
  if (status === 429 || lower.includes("rate limit")) {
    return {
      error: "图像接口暂时限流，请稍后重试。当前仅保留提示词，右侧不显示本地预览。",
      code: "rate_limited",
    };
  }
  if (lower.includes("upstream service temporarily unavailable") || lower.includes("temporarily unavailable")) {
    return {
      error: "第三方兼容接口的上游图像服务暂时不可用，真实高清图没有生成。当前 base URL 与 key 已被本地服务读取，但 ai.input.im 暂时无法完成图像生成请求；请稍后重试，或在该平台确认图像模型可用性、余额和服务状态。",
      code: "upstream_unavailable",
    };
  }
  if ([502, 503, 504].includes(status)) {
    return {
      error: "第三方兼容接口当前返回网关或服务不可用错误，真实高清图没有生成。请稍后重试，或切换到可用的图像生成接口。",
      code: "provider_unavailable",
    };
  }
  if (status === 404 && lower.includes("not found")) {
    return {
      error: "当前 OPENAI_BASE_URL 可能不支持 /images/generations 图像生成端点，请确认该兼容接口是否开放文生图能力以及正确的图像模型名称。",
      code: "image_endpoint_not_found",
    };
  }
  return { error: message, code: code || type || "openai_image_error" };
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function getResponsesImageModel() {
  return String(process.env.OPENAI_RESPONSES_IMAGE_MODEL || "gpt-5.4").trim();
}

function getImageBase64FromImagesApi(result) {
  return result?.data?.[0]?.b64_json || null;
}

function getImageUrlFromImagesApi(result) {
  return result?.data?.[0]?.url || result?.data?.[0]?.image_url || null;
}

function getImageBase64FromResponses(result) {
  const output = Array.isArray(result?.output) ? result.output : [];
  const imageItem = output.find((item) => item?.type === "image_generation_call" && item?.result);
  return imageItem?.result || null;
}

async function callImagesApi({ apiKey, prompt, body }) {
  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
  const outputFormat = body.format || process.env.OPENAI_IMAGE_FORMAT || "webp";
  const requestPayloads = [
    {
      name: "images.full",
      payload: {
        model,
        prompt,
        n: 1,
        size: body.size || process.env.OPENAI_IMAGE_SIZE || "1536x1024",
        quality: body.quality || process.env.OPENAI_IMAGE_QUALITY || "high",
        output_format: outputFormat,
        background: body.background || process.env.OPENAI_IMAGE_BACKGROUND || "auto",
      },
    },
    {
      name: "images.minimal",
      payload: { model, prompt },
    },
  ];

  const errors = [];
  for (const request of requestPayloads) {
    const response = await fetch(`${getOpenAIBaseUrl()}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(request.payload),
    });
    const result = await readApiResponseJson(response);
    if (response.ok) {
      const imageBase64 = getImageBase64FromImagesApi(result);
      const imageUrl = getImageUrlFromImagesApi(result);
      if (imageBase64 || imageUrl) {
        return {
          ok: true,
          route: request.name,
          model,
          imageDataUrl: imageBase64 ? `data:image/${outputFormat};base64,${imageBase64}` : null,
          imageUrl,
          usage: result.usage || null,
        };
      }
      errors.push({
        route: request.name,
        status: 502,
        error: "图像接口请求成功，但没有返回 b64_json 或 url。",
        code: "missing_image_payload",
      });
      continue;
    }
    errors.push({
      route: request.name,
      status: response.status,
      ...normalizeOpenAIImageError(result?.error, response.status),
    });
  }
  return { ok: false, errors };
}

async function callResponsesImageTool({ apiKey, prompt }) {
  const model = getResponsesImageModel();
  const response = await fetch(`${getOpenAIBaseUrl()}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
      tools: [{ type: "image_generation", action: "generate" }],
    }),
  });

  const result = await readApiResponseJson(response);
  if (!response.ok) {
    return {
      ok: false,
      errors: [
        {
          route: "responses.image_generation",
          status: response.status,
          ...normalizeOpenAIImageError(result?.error, response.status),
        },
      ],
    };
  }

  const imageBase64 = getImageBase64FromResponses(result);
  if (!imageBase64) {
    return {
      ok: false,
      errors: [
        {
          route: "responses.image_generation",
          status: 502,
          error: "Responses API 已返回，但没有找到 image_generation_call.result。",
          code: "missing_responses_image",
        },
      ],
    };
  }

  return {
    ok: true,
    route: "responses.image_generation",
    model,
    imageDataUrl: `data:image/png;base64,${imageBase64}`,
    usage: result.usage || null,
  };
}

function shouldTryResponsesFallback(errors) {
  return errors.some((error) =>
    [
      "upstream_unavailable",
      "provider_unavailable",
      "image_endpoint_not_found",
      "missing_image_payload",
      "openai_image_error",
    ].includes(error.code),
  );
}

async function handleImageGeneration(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Only POST is supported." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 400, {
      error: "未检测到 OPENAI_API_KEY，当前可继续使用诗歌推荐与提示词，右侧不显示本地预览。",
    });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const prompt = String(body.prompt || "").trim();
    if (!prompt) {
      sendJson(res, 400, { error: "Prompt is required." });
      return;
    }

    const imagesResult = await callImagesApi({ apiKey, prompt, body });
    if (imagesResult.ok) {
      sendJson(res, 200, imagesResult);
      return;
    }

    if (shouldTryResponsesFallback(imagesResult.errors)) {
      const responsesResult = await callResponsesImageTool({ apiKey, prompt });
      if (responsesResult.ok) {
        sendJson(res, 200, {
          ...responsesResult,
          fallbackFrom: "images/generations",
          note: "Images API 暂不可用，已自动改用 Responses API 的 image_generation 工具生成高清图。",
          attempts: imagesResult.errors.map(({ route, status, code, error }) => ({ route, status, code, error })),
        });
        return;
      }
      const allErrors = [...imagesResult.errors, ...responsesResult.errors];
      sendJson(res, responsesResult.errors.at(-1)?.status || 502, {
        error: allErrors.map((error) => `${error.route}: ${error.error}`).join("；"),
        code: "all_image_routes_failed",
        attempts: allErrors,
      });
      return;
    }

    const lastError = imagesResult.errors.at(-1);
    sendJson(res, lastError?.status || 502, lastError || { error: "图像生成失败。", code: "image_generation_failed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unknown image generation error." });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  const target = normalize(join(root, pathname));
  if (!target.startsWith(root) || !existsSync(target)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  const ext = extname(target);
  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  createReadStream(target).pipe(res);
}

const server = createServer(async (req, res) => {
  if ((req.url || "").startsWith("/api/generate-image")) {
    await handleImageGeneration(req, res);
    return;
  }
  await serveStatic(req, res);
});

server.listen(port, "127.0.0.1", async () => {
  const readme = await readFile(join(root, "README.md"), "utf8").catch(() => "");
  console.log(`流光诗境智能体已启动：http://127.0.0.1:${port}/`);
  if (!process.env.OPENAI_API_KEY) {
    console.log("未检测到 OPENAI_API_KEY：高清生图按钮会提示配置状态，右侧不显示本地预览。");
  } else {
    console.log("已检测到 OPENAI_API_KEY：高清生图将通过本地代理请求 OpenAI 图像接口。");
  }
  console.log(`图像接口基础地址：${getOpenAIBaseUrl()}`);
  if (readme.includes("高清图像生成")) {
    console.log("README 已包含高清图像生成说明。");
  }
});
