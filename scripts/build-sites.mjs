import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const distServer = join(root, "dist/server");

const textAssets = [
  ["/index.html", "index.html", "text/html; charset=utf-8"],
  ["/styles.css", "styles.css", "text/css; charset=utf-8"],
  ["/app.js", "app.js", "text/javascript; charset=utf-8"],
  ["/data/poems.js", "data/poems.js", "text/javascript; charset=utf-8"],
  ["/README.md", "README.md", "text/markdown; charset=utf-8"],
];

const assets = Object.fromEntries(
  textAssets.map(([route, file, contentType]) => [
    route,
    {
      contentType,
      body: readFileSync(join(root, file), "utf8"),
    },
  ]),
);
assets["/"] = assets["/index.html"];

const workerSource = `const ASSETS = ${JSON.stringify(assets)};

function sendJson(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getEnv(env, key, fallback = "") {
  return String(env?.[key] || fallback).trim();
}

function getOpenAIBaseUrl(env) {
  return getEnv(env, "OPENAI_BASE_URL", "https://api.openai.com/v1").replace(/\\/+$/, "");
}

async function readApiResponseJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {
      error: {
        message: \`图像接口返回了非 JSON 响应（HTTP \${response.status}）。请检查 OPENAI_BASE_URL 是否为兼容 OpenAI API 的 /v1 地址。\`,
        code: "non_json_response",
      },
    };
  }
}

function normalizeOpenAIImageError(error, status) {
  const message = error?.message || "OpenAI image generation failed.";
  const type = error?.type || "";
  const code = error?.code || "";
  const lower = \`\${message} \${type} \${code}\`.toLowerCase();

  if (lower.includes("billing hard limit") || lower.includes("hard limit")) {
    return {
      error: "OpenAI 项目的账单或预算上限已达到，真实高清图没有生成。请在 Platform 中提高项目预算、切换有额度的 Project，或更换可用密钥后重试。",
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
      error: "OPENAI_API_KEY 无效或没有被当前项目授权，请检查部署环境变量和接口项目权限。",
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
      error: "第三方兼容接口的上游图像服务暂时不可用，真实高清图没有生成。系统会尝试切换到 Responses 图像工具。",
      code: "upstream_unavailable",
    };
  }
  if ([502, 503, 504].includes(status)) {
    return {
      error: "第三方兼容接口当前返回网关或服务不可用错误，真实高清图没有生成。系统会尝试切换到 Responses 图像工具。",
      code: "provider_unavailable",
    };
  }
  if (status === 404 && lower.includes("not found")) {
    return {
      error: "当前 OPENAI_BASE_URL 可能不支持 /images/generations 图像生成端点。",
      code: "image_endpoint_not_found",
    };
  }
  return { error: message, code: code || type || "openai_image_error" };
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

async function callImagesApi({ env, prompt, body }) {
  const apiKey = getEnv(env, "OPENAI_API_KEY");
  const model = getEnv(env, "OPENAI_IMAGE_MODEL", "gpt-image-2");
  const outputFormat = body.format || getEnv(env, "OPENAI_IMAGE_FORMAT", "webp");
  const requestPayloads = [
    {
      name: "images.full",
      payload: {
        model,
        prompt,
        n: 1,
        size: body.size || getEnv(env, "OPENAI_IMAGE_SIZE", "1536x1024"),
        quality: body.quality || getEnv(env, "OPENAI_IMAGE_QUALITY", "high"),
        output_format: outputFormat,
        background: body.background || getEnv(env, "OPENAI_IMAGE_BACKGROUND", "auto"),
      },
    },
    {
      name: "images.minimal",
      payload: { model, prompt },
    },
  ];

  const errors = [];
  for (const request of requestPayloads) {
    const response = await fetch(\`\${getOpenAIBaseUrl(env)}/images/generations\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: \`Bearer \${apiKey}\`,
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
          imageDataUrl: imageBase64 ? \`data:image/\${outputFormat};base64,\${imageBase64}\` : null,
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

async function callResponsesImageTool({ env, prompt }) {
  const apiKey = getEnv(env, "OPENAI_API_KEY");
  const model = getEnv(env, "OPENAI_RESPONSES_IMAGE_MODEL", "gpt-5.4");
  const response = await fetch(\`\${getOpenAIBaseUrl(env)}/responses\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${apiKey}\`,
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
    imageDataUrl: \`data:image/png;base64,\${imageBase64}\`,
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

async function handleImageGeneration(request, env) {
  if (request.method !== "POST") {
    return sendJson({ error: "Only POST is supported." }, 405);
  }

  if (!getEnv(env, "OPENAI_API_KEY")) {
    return sendJson(
      {
        error: "未检测到 OPENAI_API_KEY，当前可继续使用诗歌推荐与提示词，右侧不显示本地预览。",
      },
      400,
    );
  }

  try {
    const body = await request.json();
    const prompt = String(body.prompt || "").trim();
    if (!prompt) {
      return sendJson({ error: "Prompt is required." }, 400);
    }

    const imagesResult = await callImagesApi({ env, prompt, body });
    if (imagesResult.ok) {
      return sendJson(imagesResult);
    }

    if (shouldTryResponsesFallback(imagesResult.errors)) {
      const responsesResult = await callResponsesImageTool({ env, prompt });
      if (responsesResult.ok) {
        return sendJson({
          ...responsesResult,
          fallbackFrom: "images/generations",
          note: "Images API 暂不可用，已自动改用 Responses API 的 image_generation 工具生成高清图。",
          attempts: imagesResult.errors.map(({ route, status, code, error }) => ({ route, status, code, error })),
        });
      }
      const allErrors = [...imagesResult.errors, ...responsesResult.errors];
      return sendJson(
        {
          error: allErrors.map((error) => \`\${error.route}: \${error.error}\`).join("；"),
          code: "all_image_routes_failed",
          attempts: allErrors,
        },
        responsesResult.errors.at(-1)?.status || 502,
      );
    }

    const lastError = imagesResult.errors.at(-1);
    return sendJson(lastError || { error: "图像生成失败。", code: "image_generation_failed" }, lastError?.status || 502);
  } catch (error) {
    return sendJson({ error: error.message || "Unknown image generation error." }, 500);
  }
}

function serveStatic(request) {
  const url = new URL(request.url);
  const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const asset = ASSETS[pathname];
  if (!asset) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(asset.body, {
    headers: {
      "Content-Type": asset.contentType,
      "Cache-Control": "no-cache",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/generate-image")) {
      return handleImageGeneration(request, env);
    }
    return serveStatic(request);
  },
};
`;

rmSync(join(root, "dist"), { recursive: true, force: true });
mkdirSync(distServer, { recursive: true });
writeFileSync(join(distServer, "index.js"), workerSource);
console.log("Built dist/server/index.js");
