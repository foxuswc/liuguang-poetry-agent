const poemDatabase = [
  {
    id: 1,
    title: "《行路难·其一》",
    author: "李白",
    era: "唐代",
    content:
      "金樽清酒斗十千，玉盘珍羞直万钱。\n停杯投箸不能食，拔剑四顾心茫然。\n欲渡黄河冰塞川，将登太行雪满山。\n闲来垂钓碧溪上，忽复乘舟梦日边。\n行路难，行路难，多歧路，今安在？\n长风破浪会有时，直挂云帆济沧海。",
    energy: 0.8,
    pleasant: -0.5,
    tags: ["焦虑", "迷茫", "压力大", "受挫", "找不到方向", "渴望突破"],
    guide:
      "当你感到前路被冰雪封堵，拔剑四顾却不知劲往何处使时，李白告诉你：这种焦躁是正常的。暂时的停滞是为了积蓄“长风破浪”的力量。请相信，你的云帆终将升起。",
    imagery:
      "A person holding a sword beside a frozen yellow river, high mountains covered in snow, ancient Chinese ink wash painting, heavy atmosphere, distant warm light.",
    palette: ["#6c7f90", "#d9c17a", "#31445a"],
  },
  {
    id: 2,
    title: "《定风波》",
    author: "苏轼",
    era: "宋代",
    content:
      "莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。\n回首向来萧瑟处，归去，也无风雨也无晴。",
    energy: 0.3,
    pleasant: 0.6,
    tags: ["豁达", "逆境", "释怀", "风雨", "坚韧", "和解"],
    guide:
      "外界风雨大作，内心仍然可以吟啸徐行。这首诗回应的是对环境不可控的恐惧。当你不再对抗风雨，而是稳稳走在风雨之中，就获得了真正的自由。",
    imagery:
      "A wanderer walking slowly in a bamboo forest during rain, straw raincoat, bamboo staff, calm expression, minimalist Chinese painting, ethereal green and grey tones.",
    palette: ["#5f796f", "#b9c9bd", "#384c46"],
  },
  {
    id: 3,
    title: "《相见欢》",
    author: "李煜",
    era: "五代十国",
    content:
      "无言独上西楼，月如钩。\n寂寞梧桐深院锁清秋。\n剪不断，理还乱，是离愁。\n别是一般滋味在心头。",
    energy: -0.6,
    pleasant: -0.8,
    tags: ["抑郁", "孤独", "悲伤", "失恋", "深夜", "无力感"],
    guide:
      "有时候，情绪就像乱麻一样无法梳理。李煜没有急着解决愁绪，而是用月、梧桐、深院把痛楚外化出来。承认痛苦，是疗愈的第一步。",
    imagery:
      "A lonely figure standing on a high tower at night, crescent moon, dark courtyard with tung trees, locked gate, cold blue and dark grey palette.",
    palette: ["#2f4258", "#8a94a3", "#0f1721"],
  },
  {
    id: 4,
    title: "《终南别业》",
    author: "王维",
    era: "唐代",
    content:
      "中岁颇好道，晚家南山陲。\n兴来每独往，胜事空自知。\n行到水穷处，坐看云起时。\n偶然值林叟，谈笑无还期。",
    energy: -0.7,
    pleasant: 0.9,
    tags: ["安宁", "放松", "治愈", "休息", "随遇而安", "松弛"],
    guide:
      "这是一剂针对紧绷感的良药。走到水穷处，不一定是失败，也可能是在提醒你抬头看云。坐下来，不是放弃，而是换一个视角看世界。",
    imagery:
      "A person sitting quietly by the end of a stream, white clouds rising from mountains, misty forest, Zen atmosphere, soft watercolor style.",
    palette: ["#87a28f", "#e3ddc7", "#496b58"],
  },
  {
    id: 5,
    title: "《登高》",
    author: "杜甫",
    era: "唐代",
    content:
      "风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。",
    energy: 0.7,
    pleasant: -0.7,
    tags: ["悲凉", "沉郁", "沧桑", "壮烈", "孤独", "命运无常"],
    guide:
      "这不是轻飘飘的忧伤，而是天地间宏大的悲怆。当你觉得个人渺小时，杜甫用无边落木和不尽长江接住了你，让心中的块垒有了出口。",
    imagery:
      "A high platform on an autumn mountain, strong wind, falling leaves, endless river, wide sky, birds circling, desolate but majestic, deep orange and brown colors.",
    palette: ["#8b5e3c", "#d6a35f", "#39414a"],
  },
  {
    id: 6,
    title: "《面朝大海，春暖花开》",
    author: "海子",
    era: "现代",
    content:
      "从明天起，做一个幸福的人\n喂马、劈柴，周游世界\n从明天起，关心粮食和蔬菜\n我有一所房子，面朝大海，春暖花开……",
    energy: 0.5,
    pleasant: 0.8,
    tags: ["温暖", "希望", "憧憬", "纯真", "幸福", "祝福"],
    guide:
      "海子带我们回到朴素生活的愿景。疲惫时读它，可以重新看见粮食、蔬菜、海和春天。愿你也能在心中建起那所房子。",
    imagery:
      "A simple house facing the blue ocean, blooming flowers in warm spring, bright sunlight, golden wheat fields, vibrant impressionist style.",
    palette: ["#4b8eaf", "#e9bf5b", "#f3d8a6"],
  },
  {
    id: 7,
    title: "《一代人》",
    author: "顾城",
    era: "现代",
    content: "黑夜给了我黑色的眼睛，\n我却用它寻找光明。",
    energy: 0.9,
    pleasant: 0.2,
    tags: ["坚定", "寻找", "力量", "短诗", "哲理", "希望"],
    guide:
      "极短，却极有力量。它把黑夜从阻碍转化成寻找的起点。适合在低谷里给自己一点干净、直接的勇气。",
    imagery:
      "Close-up of a pair of eyes in darkness, reflecting starlight, high contrast, quiet but powerful, poetic photography style.",
    palette: ["#1b2530", "#d3d7dc", "#6f89a4"],
  },
  {
    id: 8,
    title: "《未选择的路》",
    author: "罗伯特·弗罗斯特",
    era: "美国",
    content:
      "黄色的树林里分出两条路，\n可惜我不能同时去涉足。\n我选择了人迹更少的一条，\n从此决定了我一生的道路。",
    energy: 0.4,
    pleasant: -0.2,
    tags: ["抉择", "遗憾", "思考", "独立", "人生岔路口", "选择"],
    guide:
      "面对选择的焦虑是人类共有的体验。无论选哪条路，遗憾都可能存在。但独特的选择，也会慢慢塑造现在的你。",
    imagery:
      "A yellow autumn forest with two diverging paths, fallen leaves, soft sunlight through trees, contemplative realistic style.",
    palette: ["#b88b35", "#d8c28e", "#5f513e"],
  },
  {
    id: 9,
    title: "《飞鸟集·No.82》",
    author: "泰戈尔",
    era: "印度",
    content:
      "Let life be beautiful like summer flowers\nand death like autumn leaves.\n使生如夏花之绚烂，死如秋叶之静美。",
    energy: 0.6,
    pleasant: 0.8,
    tags: ["豁达", "生命力", "唯美", "释怀", "珍惜当下"],
    guide:
      "泰戈尔把沉重的生命问题说得明亮而平静。当你感到虚无时，这句诗提醒你：活着就要像夏花一样尽情绽放。",
    imagery:
      "Vibrant summer flowers blooming under bright sun, golden autumn leaves falling gently, circle of life, colorful poetic illustration.",
    palette: ["#d46844", "#f0c553", "#5a7c55"],
  },
];

const textbookPoems = (window.LIUGUANG_POEMS || [])
  .filter((poem) => poem.matchable !== false)
  .map((poem) => ({
    id: poem.id,
    title: poem.title,
    author: poem.author,
    era: `${poem.era || "教材"}｜${poem.grade}${poem.volume}`,
    content: poem.content,
    energy: Number(poem.energy),
    pleasant: Number(poem.pleasant),
    tags: poem.tags || [],
    guide: poem.therapeutic_guide,
    imagery: poem.image_prompt,
    imageryZh: poem.visual_imagery,
    teachingScene: poem.teaching_scene,
    sourceUrl: poem.source_url,
    palette: paletteForPoem(poem),
  }));

const activePoemDatabase = textbookPoems.length ? textbookPoems : poemDatabase;

const keywordProfiles = [
  { words: ["焦虑", "紧张", "压力", "考试", "受挫", "迷茫", "堵", "烦"], energy: 0.78, pleasant: -0.58 },
  { words: ["孤独", "失恋", "emo", "难受", "悲伤", "低落", "抑郁", "无力"], energy: -0.58, pleasant: -0.82 },
  { words: ["疲惫", "累", "安静", "休息", "放松", "平静", "松弛"], energy: -0.62, pleasant: 0.66 },
  { words: ["希望", "力量", "光", "坚持", "勇气", "突破", "寻找"], energy: 0.82, pleasant: 0.28 },
  { words: ["选择", "抉择", "岔路", "未来", "方向", "纠结"], energy: 0.42, pleasant: -0.24 },
  { words: ["温暖", "幸福", "春天", "期待", "喜欢", "祝福"], energy: 0.52, pleasant: 0.82 },
  { words: ["悲凉", "命运", "沧桑", "壮烈", "宏大"], energy: 0.72, pleasant: -0.72 },
];

const state = {
  energy: 0.2,
  pleasant: 0,
  currentMatches: [],
  activePoem: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatValue(value) {
  return Number(value).toFixed(2);
}

function inferEmotionFromText(text) {
  if (!text.trim()) {
    return null;
  }
  const normalized = text.toLowerCase();
  const hits = [];
  keywordProfiles.forEach((profile) => {
    const hitCount = profile.words.filter((word) => normalized.includes(word.toLowerCase())).length;
    if (hitCount > 0) {
      hits.push({ ...profile, hitCount });
    }
  });
  if (!hits.length) {
    return null;
  }
  const total = hits.reduce((sum, hit) => sum + hit.hitCount, 0);
  const energy = hits.reduce((sum, hit) => sum + hit.energy * hit.hitCount, 0) / total;
  const pleasant = hits.reduce((sum, hit) => sum + hit.pleasant * hit.hitCount, 0) / total;
  return { energy, pleasant, hits };
}

function updateEmotionControls(energy, pleasant) {
  state.energy = clamp(Number(energy), -1, 1);
  state.pleasant = clamp(Number(pleasant), -1, 1);
  $("#energy").value = state.energy;
  $("#pleasant").value = state.pleasant;
  $("#energyValue").textContent = formatValue(state.energy);
  $("#pleasantValue").textContent = formatValue(state.pleasant);
  const x = ((state.pleasant + 1) / 2) * 100;
  const y = (1 - (state.energy + 1) / 2) * 100;
  $("#emotionDot").style.left = `${x}%`;
  $("#emotionDot").style.top = `${y}%`;
}

function getQuadrant(energy, pleasant) {
  if (energy >= 0 && pleasant >= 0) return "高能量 / 高愉悦";
  if (energy >= 0 && pleasant < 0) return "高能量 / 低愉悦";
  if (energy < 0 && pleasant < 0) return "低能量 / 低愉悦";
  return "低能量 / 高愉悦";
}

function getTextTagHits(text, poem) {
  const normalized = text.toLowerCase();
  return poem.tags.filter((tag) => normalized.includes(tag.toLowerCase())).length;
}

function paletteForPoem(poem) {
  const energy = Number(poem.energy);
  const pleasant = Number(poem.pleasant);
  if (pleasant < -0.45 && energy > 0.25) return ["#5b6778", "#d2b56f", "#24384d"];
  if (pleasant < -0.45) return ["#37465a", "#aab4c0", "#15202d"];
  if (pleasant > 0.45 && energy < 0) return ["#789b82", "#eadbb7", "#3f6650"];
  if (pleasant > 0.4) return ["#4b86a2", "#e7c15e", "#355d6e"];
  if (energy > 0.45) return ["#8f6542", "#d9a969", "#38424d"];
  return ["#6c7f90", "#d8c49a", "#31445a"];
}

function scorePoem(poem, text, energy, pleasant) {
  const distance = Math.hypot(poem.energy - energy, poem.pleasant - pleasant);
  const coordinateScore = Math.max(0, 1 - distance / 2.83);
  const tagScore = getTextTagHits(text, poem) * 0.12;
  const titleScore = text.includes(poem.author) || text.includes(poem.title.replace(/[《》]/g, "")) ? 0.08 : 0;
  const anchorBoost = getAnchorBoost(text, poem);
  return clamp(coordinateScore * 0.82 + tagScore + titleScore + anchorBoost, 0, 1);
}

function getAnchorBoost(text, poem) {
  const title = poem.title.replace(/[《》]/g, "");
  const anchors = [
    { pattern: /焦虑|压力|迷茫|方向|考试|受挫/, title: "行路难", boost: 0.18 },
    { pattern: /疲惫|安静|放松|休息|松弛|平静/, title: "终南别业", boost: 0.14 },
    { pattern: /孤独|低落|难受|深夜|想家|思念/, title: "静夜思", boost: 0.12 },
    { pattern: /力量|希望|光|勇气|坚持|突破/, title: "竹石", boost: 0.12 },
  ];
  const found = anchors.find((anchor) => anchor.pattern.test(text) && title.includes(anchor.title));
  return found ? found.boost : 0;
}

function matchPoems() {
  const text = $("#emotionText").value;
  const inferred = inferEmotionFromText(text);
  if (inferred) {
    updateEmotionControls(inferred.energy, inferred.pleasant);
  }
  const matches = activePoemDatabase
    .map((poem) => ({
      poem,
      score: scorePoem(poem, text, state.energy, state.pleasant),
    }))
    .sort((a, b) => b.score - a.score);
  state.currentMatches = matches;
  renderResult(matches[0].poem, matches[0].score);
  renderAlternatives(matches.slice(1, 4));
}

function renderResult(poem, score) {
  state.activePoem = poem;
  $("#emptyState").classList.add("hidden");
  $("#resultCard").classList.remove("hidden");
  $("#poemTitle").textContent = poem.title;
  $("#poemAuthor").textContent = `${poem.author}｜${poem.era}`;
  $("#poemContent").textContent = poem.content;
  $("#guideText").textContent = poem.guide;
  $("#reasonText").textContent = buildReason(poem);
  $("#quadrantBadge").textContent = getQuadrant(state.energy, state.pleasant);
  $("#matchScore").textContent = `匹配度 ${Math.round(score * 100)}%`;
  $("#visualPrompt").value = buildHighResPrompt(poem);
  $("#generatedImage").classList.add("hidden");
  $("#generatedImage").removeAttribute("src");
  $("#imageStatus").textContent = "已生成教学意象提示词，可点击生成高清意象图。";
  renderVisual(poem);
}

function buildReason(poem) {
  const distanceEnergy = Math.abs(poem.energy - state.energy).toFixed(2);
  const distancePleasant = Math.abs(poem.pleasant - state.pleasant).toFixed(2);
  return `系统将当前状态定位在“${getQuadrant(state.energy, state.pleasant)}”，与这首诗的能量值 ${poem.energy}、愉悦度 ${poem.pleasant} 接近。它的情绪标签包括 ${poem.tags.slice(0, 4).join("、")}，可回应当前表达中的情绪线索。坐标差异：能量 ${distanceEnergy}，愉悦 ${distancePleasant}。`;
}

function renderVisual(poem) {
  const [a, b, c] = poem.palette;
  const stage = $("#visualStage");
  stage.style.setProperty("--tone-a", a);
  stage.style.setProperty("--tone-b", b);
  stage.style.setProperty("--tone-c", c);
  stage.classList.add("canvas-ready");
  stage.style.background = b;
  drawPoeticPreview(poem, stage);
  stage.querySelector(".sun").style.background = state.pleasant >= 0 ? "#d99534" : "#d2d7df";
  stage.querySelector(".mountain-back").style.background = `${c}66`;
  stage.querySelector(".mountain-front").style.background = `${a}aa`;
  stage.querySelector(".river").style.backgroundColor = `${c}55`;
  stage.querySelector(".figure").style.opacity = state.pleasant < -0.55 ? "0.9" : "0.68";
}

function hexToRgb(hex) {
  const clean = String(hex || "#6c7f90").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean.padEnd(6, "0").slice(0, 6);
  const value = Number.parseInt(full, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function mixColor(hexA, hexB, amount = 0.5, alpha = 1) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const t = clamp(amount, 0, 1);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const blue = Math.round(a.b + (b.b - a.b) * t);
  return `rgba(${r}, ${g}, ${blue}, ${alpha})`;
}

function seededValue(seed, index) {
  const x = Math.sin(seed * 997 + index * 131.7) * 10000;
  return x - Math.floor(x);
}

function poemSeed(poem) {
  return [...`${poem.title}${poem.author}`].reduce((sum, char) => sum + char.charCodeAt(0), 17);
}

function drawInkRange(ctx, width, height, color, baseline, amplitude, seed, alpha) {
  ctx.beginPath();
  ctx.moveTo(-width * 0.08, height);
  for (let i = 0; i <= 8; i += 1) {
    const x = (width * i) / 8;
    const y = baseline - seededValue(seed, i) * amplitude - Math.sin(i * 0.9 + seed) * amplitude * 0.22;
    const nextX = (width * (i + 0.5)) / 8;
    const nextY = baseline - seededValue(seed, i + 21) * amplitude;
    ctx.quadraticCurveTo(nextX, nextY, x, y);
  }
  ctx.lineTo(width * 1.08, height);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawMist(ctx, width, height, seed) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 6; i += 1) {
    const y = height * (0.34 + i * 0.072 + seededValue(seed, i + 40) * 0.025);
    const gradient = ctx.createLinearGradient(0, y, width, y + 24);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.22, "rgba(255,255,255,0.24)");
    gradient.addColorStop(0.58, "rgba(255,255,255,0.46)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(width * 0.5, y, width * (0.55 + seededValue(seed, i + 61) * 0.2), 18 + seededValue(seed, i + 72) * 14, 0.03 * i, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPaperTexture(ctx, width, height, seed) {
  ctx.save();
  for (let i = 0; i < 2600; i += 1) {
    const x = seededValue(seed, i) * width;
    const y = seededValue(seed + 3, i) * height;
    const grain = Math.floor(90 + seededValue(seed + 7, i) * 70);
    const alpha = 0.018 + seededValue(seed + 11, i) * 0.035;
    ctx.fillStyle = `rgba(${grain}, ${grain}, ${grain}, ${alpha})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }
  ctx.restore();
}

function getCueText(poem) {
  return [
    poem.title,
    poem.author,
    poem.era,
    poem.content,
    poem.imagery,
    poem.imageryZh,
    poem.teachingScene,
    poem.tags.join(" "),
  ]
    .filter(Boolean)
    .join(" ");
}

function hasCue(poem, pattern) {
  return pattern.test(getCueText(poem));
}

function drawBrushCurve(ctx, points, color, lineWidth, alpha = 1) {
  if (points.length < 2) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i += 1) {
    const middleX = (points[i].x + points[i + 1].x) / 2;
    const middleY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, middleX, middleY);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
  ctx.stroke();
  ctx.restore();
}

function drawInkSpeckles(ctx, width, height, seed, color, count, alpha = 0.16) {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i += 1) {
    const x = seededValue(seed, i) * width;
    const y = height * (0.18 + seededValue(seed + 5, i) * 0.72);
    const radius = 0.6 + seededValue(seed + 9, i) * 2.6;
    ctx.globalAlpha = alpha * seededValue(seed + 13, i);
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.8, radius, seededValue(seed + 17, i) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawRiverOrIce(ctx, width, height, poem, seed, toneA, toneB, toneC) {
  const coldScene = hasCue(poem, /冰|雪|寒|塞川|太行|白|霜/);
  const waterScene = hasCue(poem, /江|河|海|溪|湖|渡|潮|流|水|舟|船|帆/);
  const pathScene = !waterScene && hasCue(poem, /路|径|行|登|山|林|选择|岔/);

  if (pathScene) {
    const path = ctx.createLinearGradient(width * 0.42, height * 0.58, width * 0.58, height);
    path.addColorStop(0, mixColor(toneB, "#fff9ef", 0.38, 0.42));
    path.addColorStop(1, mixColor(toneA, "#e8d8b7", 0.35, 0.78));
    ctx.fillStyle = path;
    ctx.beginPath();
    ctx.moveTo(width * 0.46, height * 0.58);
    ctx.bezierCurveTo(width * 0.58, height * 0.7, width * 0.36, height * 0.82, width * 0.38, height);
    ctx.lineTo(width * 0.72, height);
    ctx.bezierCurveTo(width * 0.6, height * 0.82, width * 0.75, height * 0.7, width * 0.58, height * 0.58);
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < 11; i += 1) {
      const y = height * (0.62 + i * 0.035);
      drawBrushCurve(
        ctx,
        [
          { x: width * (0.38 + seededValue(seed, i) * 0.05), y },
          { x: width * (0.5 + seededValue(seed + 1, i) * 0.06), y: y + 8 },
          { x: width * (0.66 + seededValue(seed + 2, i) * 0.05), y: y - 6 },
        ],
        "rgba(96,75,52,0.18)",
        width * 0.003,
        0.8,
      );
    }
    return;
  }

  const river = ctx.createLinearGradient(width * 0.2, height * 0.58, width * 0.76, height);
  river.addColorStop(0, coldScene ? "rgba(255,255,255,0.48)" : "rgba(255,255,255,0.16)");
  river.addColorStop(0.36, mixColor(toneC, "#dcebef", coldScene ? 0.72 : 0.45, coldScene ? 0.62 : 0.42));
  river.addColorStop(1, mixColor(toneA, "#eff5f2", coldScene ? 0.66 : 0.38, coldScene ? 0.72 : 0.54));
  ctx.beginPath();
  ctx.moveTo(width * 0.44, height * 0.6);
  ctx.bezierCurveTo(width * 0.58, height * 0.72, width * 0.34, height * 0.84, width * 0.4, height);
  ctx.lineTo(width * 0.78, height);
  ctx.bezierCurveTo(width * 0.62, height * 0.82, width * 0.88, height * 0.74, width * 0.64, height * 0.6);
  ctx.closePath();
  ctx.fillStyle = river;
  ctx.fill();

  const strokeColor = coldScene ? "rgba(255,255,255,0.58)" : mixColor("#ffffff", toneB, 0.35, 0.55);
  for (let i = 0; i < 9; i += 1) {
    const y = height * (0.66 + i * 0.036);
    drawBrushCurve(
      ctx,
      [
        { x: width * 0.06, y },
        { x: width * 0.28, y: y - 16 + seededValue(seed, i) * 12 },
        { x: width * 0.62, y: y + 18 - seededValue(seed + 2, i) * 16 },
        { x: width * 0.96, y: y - 7 },
      ],
      strokeColor,
      Math.max(1, width * 0.002),
      state.energy > 0.35 ? 0.44 : 0.26,
    );
  }

  if (coldScene) {
    for (let i = 0; i < 18; i += 1) {
      const x = width * (0.28 + seededValue(seed + 22, i) * 0.5);
      const y = height * (0.66 + seededValue(seed + 25, i) * 0.26);
      drawBrushCurve(
        ctx,
        [
          { x, y },
          { x: x + width * (0.025 + seededValue(seed + 29, i) * 0.03), y: y - height * 0.012 },
          { x: x + width * (0.06 + seededValue(seed + 31, i) * 0.03), y: y + height * 0.01 },
        ],
        "rgba(69,86,98,0.22)",
        Math.max(1, width * 0.002),
        0.7,
      );
    }
  }
}

function drawWeatherAndLight(ctx, width, height, poem, seed) {
  if (hasCue(poem, /月|夜|西楼|静夜|清秋|钩/)) {
    const moonX = width * 0.75;
    const moonY = height * 0.18;
    ctx.save();
    ctx.fillStyle = "rgba(246,244,226,0.84)";
    ctx.beginPath();
    ctx.arc(moonX, moonY, height * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(moonX + height * 0.026, moonY - height * 0.008, height * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    const sunX = width * (state.pleasant >= 0 ? 0.72 : 0.78);
    const sunY = height * (state.energy >= 0 ? 0.2 : 0.28);
    const glow = ctx.createRadialGradient(sunX, sunY, 3, sunX, sunY, height * 0.24);
    glow.addColorStop(0, state.pleasant >= 0 ? "rgba(238,188,87,0.72)" : "rgba(219,225,230,0.72)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  if (hasCue(poem, /雨|风雨|烟雨|打叶|春风/)) {
    ctx.save();
    ctx.strokeStyle = "rgba(72,94,95,0.18)";
    ctx.lineWidth = Math.max(1, width * 0.0016);
    for (let i = 0; i < 86; i += 1) {
      const x = seededValue(seed + 61, i) * width;
      const y = seededValue(seed + 64, i) * height * 0.86;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - width * 0.025, y + height * 0.055);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (hasCue(poem, /雪|冰|寒|塞川|霜/)) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    for (let i = 0; i < 90; i += 1) {
      const x = seededValue(seed + 44, i) * width;
      const y = seededValue(seed + 47, i) * height * 0.86;
      const radius = 0.8 + seededValue(seed + 49, i) * 2.4;
      ctx.globalAlpha = 0.26 + seededValue(seed + 50, i) * 0.54;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawPoetryObjects(ctx, width, height, poem, seed, toneA, toneC) {
  if (hasCue(poem, /舟|船|帆|海|江|河|渡|济沧海|乘舟/)) {
    const boatX = width * (0.63 + seededValue(seed, 70) * 0.06);
    const boatY = height * 0.72;
    ctx.save();
    ctx.fillStyle = "rgba(42,52,58,0.48)";
    ctx.beginPath();
    ctx.moveTo(boatX - width * 0.055, boatY);
    ctx.quadraticCurveTo(boatX, boatY + height * 0.035, boatX + width * 0.08, boatY - height * 0.004);
    ctx.quadraticCurveTo(boatX + width * 0.026, boatY + height * 0.022, boatX - width * 0.055, boatY);
    ctx.fill();
    ctx.fillStyle = "rgba(248,244,226,0.66)";
    ctx.beginPath();
    ctx.moveTo(boatX + width * 0.014, boatY - height * 0.108);
    ctx.bezierCurveTo(
      boatX + width * 0.064,
      boatY - height * 0.084,
      boatX + width * 0.092,
      boatY - height * 0.052,
      boatX + width * 0.084,
      boatY - height * 0.028,
    );
    ctx.quadraticCurveTo(boatX + width * 0.046, boatY - height * 0.012, boatX + width * 0.018, boatY - height * 0.012);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(48,57,61,0.35)";
    ctx.lineWidth = Math.max(1, width * 0.002);
    ctx.beginPath();
    ctx.moveTo(boatX + width * 0.016, boatY - height * 0.11);
    ctx.lineTo(boatX + width * 0.016, boatY);
    ctx.stroke();
    ctx.restore();
  }

  if (hasCue(poem, /竹|竹林|林|终南|南山|石/)) {
    ctx.save();
    ctx.strokeStyle = "rgba(43,77,63,0.44)";
    ctx.lineWidth = Math.max(2, width * 0.004);
    for (let i = 0; i < 5; i += 1) {
      const x = width * (0.08 + i * 0.035 + seededValue(seed + 81, i) * 0.02);
      drawBrushCurve(
        ctx,
        [
          { x, y: height * 0.92 },
          { x: x + width * 0.012, y: height * 0.72 },
          { x: x + width * 0.005, y: height * 0.54 },
        ],
        "rgba(44,77,60,0.46)",
        Math.max(2, width * 0.004),
        0.82,
      );
      for (let j = 0; j < 8; j += 1) {
        const by = height * (0.58 + j * 0.04);
        drawBrushCurve(
          ctx,
          [
            { x: x + width * 0.004, y: by },
            { x: x + width * (j % 2 ? -0.045 : 0.05), y: by - height * 0.018 },
          ],
          "rgba(48,94,70,0.34)",
          Math.max(1, width * 0.002),
          0.72,
        );
      }
    }
    ctx.restore();
  }

  if (hasCue(poem, /松|山|雪|寒|霜|登|高|太行|塞川/)) {
    ctx.save();
    const baseX = width * 0.12;
    const baseY = height * 0.86;
    drawBrushCurve(
      ctx,
      [
        { x: baseX, y: baseY },
        { x: baseX + width * 0.018, y: baseY - height * 0.16 },
        { x: baseX - width * 0.006, y: baseY - height * 0.3 },
      ],
      "rgba(39,62,57,0.5)",
      Math.max(2, width * 0.005),
      0.82,
    );
    for (let i = 0; i < 14; i += 1) {
      const y = baseY - height * (0.06 + i * 0.018);
      const direction = i % 2 ? -1 : 1;
      drawBrushCurve(
        ctx,
        [
          { x: baseX + width * 0.008, y },
          { x: baseX + direction * width * (0.035 + i * 0.003), y: y - height * 0.018 },
          { x: baseX + direction * width * (0.07 + i * 0.002), y: y - height * 0.008 },
        ],
        "rgba(44,83,68,0.34)",
        Math.max(1, width * 0.0022),
        0.72,
      );
    }
    ctx.restore();
  }

  if (hasCue(poem, /花|春|夏|暖|海子|幸福/)) {
    ctx.save();
    for (let i = 0; i < 34; i += 1) {
      const x = width * (0.06 + seededValue(seed + 92, i) * 0.86);
      const y = height * (0.84 + seededValue(seed + 95, i) * 0.12);
      const petal = mixColor(toneA, "#f2bb72", seededValue(seed + 97, i), 0.62);
      ctx.fillStyle = petal;
      ctx.beginPath();
      ctx.ellipse(x, y, width * 0.004, height * 0.011, seededValue(seed + 99, i) * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (hasCue(poem, /鸟|飞|雁|飞鸟/)) {
    ctx.save();
    ctx.strokeStyle = mixColor(toneC, "#ffffff", 0.18, 0.42);
    ctx.lineWidth = Math.max(1, width * 0.002);
    for (let i = 0; i < 6; i += 1) {
      const x = width * (0.52 + i * 0.055);
      const y = height * (0.25 + seededValue(seed + 104, i) * 0.18);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + width * 0.012, y - height * 0.015, x + width * 0.025, y);
      ctx.quadraticCurveTo(x + width * 0.038, y - height * 0.015, x + width * 0.052, y);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawTraveler(ctx, width, height, poem, toneC) {
  const x = width * (state.pleasant < -0.25 ? 0.28 : 0.22);
  const y = height * 0.75;
  const body = mixColor(toneC, "#101820", 0.25, 0.7);
  ctx.save();
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(x + width * 0.018, y - height * 0.067, width * 0.012, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + width * 0.012, y - height * 0.045);
  ctx.quadraticCurveTo(x - width * 0.018, y + height * 0.02, x - width * 0.005, y + height * 0.095);
  ctx.lineTo(x + width * 0.048, y + height * 0.095);
  ctx.quadraticCurveTo(x + width * 0.058, y + height * 0.015, x + width * 0.028, y - height * 0.045);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(28,36,40,0.48)";
  ctx.lineWidth = Math.max(2, width * 0.003);
  ctx.beginPath();
  ctx.moveTo(x + width * 0.025, y - height * 0.025);
  ctx.quadraticCurveTo(x - width * 0.04, y + height * 0.02, x - width * 0.012, y + height * 0.078);
  ctx.stroke();
  if (hasCue(poem, /剑|壮烈|破浪|行路难/)) {
    ctx.strokeStyle = "rgba(240,235,213,0.68)";
    ctx.lineWidth = Math.max(1, width * 0.0017);
    ctx.beginPath();
    ctx.moveTo(x + width * 0.044, y - height * 0.035);
    ctx.lineTo(x + width * 0.092, y + height * 0.03);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPoeticPreview(poem, stage) {
  const canvas = $("#visualCanvas");
  const rect = stage.getBoundingClientRect();
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const width = Math.max(640, Math.round(rect.width * ratio));
  const height = Math.max(420, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext("2d");
  const [toneA, toneB, toneC] = poem.palette;
  const seed = poemSeed(poem);
  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, mixColor(toneB, "#fff8ea", state.pleasant >= 0 ? 0.72 : 0.54, 1));
  sky.addColorStop(0.48, mixColor(toneA, "#fffdf8", 0.72, 1));
  sky.addColorStop(1, mixColor(toneC, "#d8e3df", state.pleasant >= 0 ? 0.38 : 0.22, 1));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  drawWeatherAndLight(ctx, width, height, poem, seed);

  drawInkSpeckles(ctx, width, height, seed + 2, mixColor(toneC, "#ffffff", 0.26, 1), 900, 0.08);
  drawInkRange(ctx, width, height, mixColor(toneC, "#ffffff", 0.34, 0.36), height * 0.57, height * 0.2, seed, 0.74);
  drawInkRange(ctx, width, height, mixColor(toneA, "#ffffff", 0.2, 0.52), height * 0.68, height * 0.17, seed + 5, 0.83);
  drawInkRange(ctx, width, height, mixColor(toneC, "#101820", 0.72, 0.28), height * 0.84, height * 0.1, seed + 12, 0.5);
  drawMist(ctx, width, height, seed);

  drawRiverOrIce(ctx, width, height, poem, seed, toneA, toneB, toneC);
  drawPoetryObjects(ctx, width, height, poem, seed, toneA, toneC);
  drawTraveler(ctx, width, height, poem, toneC);
  drawPaperTexture(ctx, width, height, seed + 9);
}

function buildHighResPrompt(poem) {
  const imagery = poem.imageryZh || poem.imagery || "山水、云气、光影与人物剪影";
  const teachingScene = poem.teachingScene || "诗歌意象观察与情绪表达课堂";
  const emotionTone = `${getQuadrant(state.energy, state.pleasant)}，能量值 ${formatValue(state.energy)}，愉悦度 ${formatValue(state.pleasant)}`;
  return `Create a refined, high-quality poetic educational illustration for Chinese language arts teaching.

Poem: ${poem.title} by ${poem.author}. Grade context: ${poem.era}.
Core imagery to visualize: ${imagery}.
Student emotional tone to translate visually: ${emotionTone}.
Teaching scene: ${teachingScene}.

Art direction: contemporary Chinese picture-book illustration with ink wash, mineral pigment, soft natural brushwork, layered mist, believable mountains/water/sky, and one coherent cinematic landscape. Make the scene feel literary, calm, emotionally resonant, and suitable for primary or middle school poetry appreciation.

Composition requirements: 16:9 horizontal image, strong foreground-midground-background depth, clear focal subject, natural perspective, atmospheric light, delicate brush texture, no flat vector shapes, no abstract geometry, no infographic style.

Negative constraints: no written Chinese or English text in the image, no watermark, no UI, no decorative icons, no stiff geometric blocks, no generic stock-photo look, no unrelated modern objects, no distorted faces or hands.`;
}

async function generateImage() {
  if (!state.activePoem) return;
  const button = $("#generateImageBtn");
  const status = $("#imageStatus");
  button.disabled = true;
  button.textContent = "生成中...";
  status.textContent = "正在请求本地图像代理。若自动切换到 Responses 图像工具，可能需要 1 分钟左右。";
  try {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: $("#visualPrompt").value,
        title: state.activePoem.title,
        size: "1536x1024",
        quality: "high",
        format: "webp",
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      const message = result.code === "billing_limit_reached"
        ? `${result.error} 现在右侧看到的是本地预览，不是模型输出。`
        : result.error || "图像生成失败";
      throw new Error(message);
    }
    const imageSource = result.imageDataUrl || result.imageUrl;
    if (!imageSource) {
      throw new Error("图像接口返回成功，但没有可显示的图片地址。");
    }
    $("#generatedImage").src = imageSource;
    $("#generatedImage").classList.remove("hidden");
    const route = result.route ? `，通道：${result.route}` : "";
    const note = result.note ? ` ${result.note}` : "";
    status.textContent = `已生成高清意象图：${result.model || "image model"}${route}。${note}`;
  } catch (error) {
    const message = String(error.message || "图像生成失败").replace(/[。.\s]+$/, "");
    const suffix = /当前可使用|当前保留/.test(message) ? "。" : "。当前保留本地意象预览和提示词。";
    status.textContent = `暂未生成高清图：${message}${suffix}`;
  } finally {
    button.disabled = false;
    button.textContent = "生成高清意象图";
  }
}

function renderAlternatives(matches) {
  const container = $("#alternatives");
  container.innerHTML = "";
  matches.forEach(({ poem, score }) => {
    const button = document.createElement("button");
    button.className = "alt-item";
    button.type = "button";
    button.innerHTML = `<strong>${poem.title}｜${poem.author}</strong><span>${poem.tags.slice(0, 4).join("、")} · 匹配度 ${Math.round(score * 100)}%</span>`;
    button.addEventListener("click", () => renderResult(poem, score));
    container.appendChild(button);
  });
}

function renderLibrary(filter = "") {
  const query = filter.trim().toLowerCase();
  const rows = activePoemDatabase.filter((poem) => {
    const haystack = [poem.title, poem.author, poem.era, poem.tags.join(" ")].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  $("#libraryRows").innerHTML = rows
    .map(
      (poem) => `
        <tr>
          <td>${poem.title}</td>
          <td>${poem.author}</td>
          <td>${poem.energy}</td>
          <td>${poem.pleasant}</td>
          <td>${poem.tags.join("、")}</td>
        </tr>
      `,
    )
    .join("");
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("liuguang-history") || "[]");
  } catch {
    return [];
  }
}

function setHistory(items) {
  localStorage.setItem("liuguang-history", JSON.stringify(items.slice(0, 8)));
}

function renderHistory() {
  const items = getHistory();
  const list = $("#historyList");
  if (!items.length) {
    list.innerHTML = '<p class="subtitle">尚未保存案例。</p>';
    return;
  }
  list.innerHTML = items
    .map(
      (item) => `
        <div class="history-card">
          <strong>${item.poemTitle}</strong>
          <small>${item.createdAt}｜${item.quadrant}</small>
          <p>${item.input}</p>
        </div>
      `,
    )
    .join("");
}

function saveCurrentCase() {
  if (!state.activePoem) return;
  const input = $("#emotionText").value.trim() || "通过情绪坐标生成";
  const item = {
    input,
    poemTitle: `${state.activePoem.title}｜${state.activePoem.author}`,
    quadrant: getQuadrant(state.energy, state.pleasant),
    createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
  };
  setHistory([item, ...getHistory()]);
  renderHistory();
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(activePoemDatabase, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "liuguang-poem-database.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function copyPrompt() {
  const prompt = $("#visualPrompt").value.trim();
  if (!prompt) return;
  navigator.clipboard?.writeText(prompt);
  $("#copyPromptBtn").textContent = "已复制";
  setTimeout(() => {
    $("#copyPromptBtn").textContent = "复制提示词";
  }, 1200);
}

function resetForm() {
  $("#emotionText").value = "";
  updateEmotionControls(0.2, 0);
  $("#emptyState").classList.remove("hidden");
  $("#resultCard").classList.add("hidden");
  $("#alternatives").innerHTML = "";
  $("#visualPrompt").value = "";
  $("#generatedImage").classList.add("hidden");
  $("#generatedImage").removeAttribute("src");
  $("#imageStatus").textContent = "未配置图像接口时显示本地意象预览；启动本地服务并配置密钥后可生成高清图。";
  state.activePoem = null;
}

function switchView(view) {
  $$(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach((section) => section.classList.remove("active"));
  $(`#view-${view}`).classList.add("active");
}

function bindEvents() {
  $("#energy").addEventListener("input", (event) => updateEmotionControls(event.target.value, state.pleasant));
  $("#pleasant").addEventListener("input", (event) => updateEmotionControls(state.energy, event.target.value));
  $("#emotionPlane").addEventListener("click", (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pleasant = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const energy = (1 - (event.clientY - rect.top) / rect.height) * 2 - 1;
    updateEmotionControls(energy, pleasant);
  });
  $("#analyzeBtn").addEventListener("click", matchPoems);
  $("#resetBtn").addEventListener("click", resetForm);
  $("#copyPromptBtn").addEventListener("click", copyPrompt);
  $("#generateImageBtn").addEventListener("click", generateImage);
  $("#saveCaseBtn").addEventListener("click", saveCurrentCase);
  $("#exportJsonBtn").addEventListener("click", downloadJson);
  $("#clearHistoryBtn").addEventListener("click", () => {
    setHistory([]);
    renderHistory();
  });
  $("#librarySearch").addEventListener("input", (event) => renderLibrary(event.target.value));
  $$(".tab-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $$(".quick-examples button").forEach((button) => {
    button.addEventListener("click", () => {
      $("#emotionText").value = button.dataset.example;
      matchPoems();
    });
  });
}

bindEvents();
updateEmotionControls(state.energy, state.pleasant);
renderLibrary();
renderHistory();

const params = new URLSearchParams(window.location.search);
if (params.get("demo") === "anxiety") {
  $("#emotionText").value = "最近考试压力很大，有点焦虑，也不知道自己接下来该往哪里走。";
  matchPoems();
}
if (params.get("view")) {
  const requestedView = params.get("view");
  if (["student", "library", "method"].includes(requestedView)) {
    switchView(requestedView);
  }
}
