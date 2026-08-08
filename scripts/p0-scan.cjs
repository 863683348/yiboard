// P0 全量扫描：emoji / 紫粉渐变 / AI 模板文案 / 硬编码 hex（除 #fff #000）
const fs = require('fs');
const path = require('path');

const EMOJI = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u;
const GRAD = /linear-gradient[^;]*?(#7C3AED|#A855F7|#EC4899|#6366F1|#4F46E5|indigo|pink)/i;
const TEMPLATE = /(Welcome to (Our|The)|Lorem ipsum|Sign up today|Sign up now|Get started today|Join now|Learn more today)/i;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue;
      walk(p);
    } else if (/\.(ts|tsx|css|js|jsx)$/.test(e.name)) {
      files.push(p);
    }
  }
}
walk('src');

const emojiHits = [];
const gradHits = [];
const tplHits = [];
const hexLines = [];

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  lines.forEach((ln, i) => {
    if (EMOJI.test(ln)) emojiHits.push(`${f}:${i + 1}: ${ln.trim().slice(0, 90)}`);
    if (GRAD.test(ln)) gradHits.push(`${f}:${i + 1}: ${ln.trim().slice(0, 90)}`);
    if (TEMPLATE.test(ln)) tplHits.push(`${f}:${i + 1}: ${ln.trim().slice(0, 90)}`);
    const hexes = ln.match(HEX) || [];
    for (const h of hexes) {
      if (h.toLowerCase() !== '#fff' && h.toLowerCase() !== '#000') {
        hexLines.push(`${f}:${i + 1}: ${h}  ${ln.trim().slice(0, 70)}`);
      }
    }
  });
}

console.log(`scanned files: ${files.length}`);
console.log(`EMOJI hits: ${emojiHits.length}`);
emojiHits.slice(0, 30).forEach((x) => console.log('  ', x));
console.log(`GRADIENT hits: ${gradHits.length}`);
gradHits.slice(0, 30).forEach((x) => console.log('  ', x));
console.log(`TEMPLATE hits: ${tplHits.length}`);
tplHits.slice(0, 30).forEach((x) => console.log('  ', x));
console.log(`HEX hits: ${hexLines.length}`);
hexLines.slice(0, 60).forEach((x) => console.log('  ', x));
