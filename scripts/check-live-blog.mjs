#!/usr/bin/env node
/**
 * 线上 /blog 与本地 posts.ts 漂移检查（advisory，不阻断 CI）
 *
 * 用途：检测并发会话导致的"线上已部署 vs 仓库 posts.ts"分叉。
 *   - LIVE - REPO：线上有但仓库无 → 疑似某提交被 push 后又 force-push 回退（危险）
 *   - REPO - LIVE：仓库有但线上无 → 正常（新帖尚未部署 / Vercel 冻结期）
 *
 * 退出码：恒为 0（软检查）；差异以警告输出。
 * 用法：node scripts/check-live-blog.mjs [--url https://...]
 */
import { build } from 'esbuild';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const urlIdx = process.argv.indexOf('--url');
const LIVE_URL = urlIdx !== -1 && process.argv[urlIdx + 1] ? process.argv[urlIdx + 1] : 'https://yiboardgame.com/blog';

// 加载本地 POSTS
const { outputFiles } = await build({
  entryPoints: [resolve(ROOT, 'src/lib/blog/posts.ts')],
  bundle: false,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});
const tmp = join(tmpdir(), `yib-live-${Date.now()}.mjs`);
writeFileSync(tmp, outputFiles[0].text);
const { POSTS } = await import(pathToFileURL(tmp).href);
unlinkSync(tmp);
const repo = new Set(POSTS.map((p) => p.slug));

// 拉线上 /blog
console.log(`拉取线上: ${LIVE_URL}`);
const res = await fetch(LIVE_URL, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; yiboard-checker)' } });
if (!res.ok) {
  console.log(`⚠️  无法获取线上 /blog（HTTP ${res.status}）—— 跳过线上对比`);
  process.exit(0);
}
const html = await res.text();
const slugRe = /href="\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?blog\/([a-z0-9-]+)"/g;
const live = new Set();
let m;
while ((m = slugRe.exec(html)) !== null) live.add(m[1]);

console.log(`仓库帖子: ${repo.size} | 线上帖子: ${live.size}`);

let drift = false;
const onlyLive = [...live].filter((s) => !repo.has(s)).sort();
const onlyRepo = [...repo].filter((s) => !live.has(s)).sort();
if (onlyLive.length) {
  drift = true;
  console.log(`\n⚠️  线上有、仓库无 (${onlyLive.length}) —— 疑似提交被 push 后回退，需人工核查:`);
  onlyLive.forEach((s) => console.log(`  - ${s}`));
}
if (onlyRepo.length) {
  console.log(`\nℹ️  仓库有、线上无 (${onlyRepo.length}) —— 新帖未部署（正常，解冻后部署即消失）:`);
  onlyRepo.forEach((s) => console.log(`  - ${s}`));
}
if (!drift && onlyRepo.length === 0) console.log('\n✅ 线上与仓库一致，无漂移。');
process.exit(0);
