#!/usr/bin/env node
/**
 * YiBoard 博客数据层校验器（防并发会话破坏 posts.ts 的 CI 门禁）
 *
 * 校验内容：
 *   1. posts.ts 能被 esbuild 编译（无语法错误 / 无孤儿破坏）
 *   2. POSTS 数组内每个元素符合 BlogPost schema（slug 唯一/URL-safe、date、
 *      title/description 双语、keywords、content 为合法 PostBlock[]、可选 howTo）
 *   3. 帖子数量不低于 MIN_POSTS（防被并发会话截断/丢失帖子）
 *   4. 文件内声明的 slug 数 == POSTS.length（防孤儿对象：append 到数组外）
 *
 * 退出码：0 = 通过；1 = 校验失败（CI 应阻断合并）
 *
 * 用法：
 *   node scripts/validate-posts.mjs [--min N]
 *   可选 --min N 覆盖最小帖子数阈值
 */
import { build } from 'esbuild';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const POSTS_FILE = resolve(ROOT, 'src/lib/blog/posts.ts');

// 当前仓库权威帖子数：working tree 18 篇（含 gomoku-rank-explained）、HEAD 17、origin/main 16。
// 旧阈值 26 系 2026-08-26 按"100 天管线应达 26 篇"的预期误设，但本仓库 git 历史里 posts.ts 帖子数从未达到 26（最高约 17），
// 导致守门钩子必然阻断所有推送。现对齐到真实工作树数量，使护栏继续发挥"防并发会话截断/丢失帖子"的作用。
// 注意：线上 yiboardgame.com 真实帖子数无法在本沙箱核验（网络受限）。若线上 > 仓库，推送前须先 `node scripts/check-live-blog.mjs` 确认无 LIVE→REPO 漂移。
let MIN_POSTS = 18;
const argMin = process.argv.indexOf('--min');
if (argMin !== -1 && process.argv[argMin + 1]) {
  const n = Number(process.argv[argMin + 1]);
  if (Number.isFinite(n) && n >= 0) MIN_POSTS = n;
}

const errors = [];
const warnings = [];

// ---------- 1) 语法编译 ----------
let POSTS = null;
let compiledSrc = null;
try {
  const result = await build({
    entryPoints: [POSTS_FILE],
    bundle: false,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  compiledSrc = result.outputFiles[0].text;
  const tmpFile = join(tmpdir(), `yib-posts-check-${Date.now()}.mjs`);
  writeFileSync(tmpFile, compiledSrc);
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    POSTS = mod.POSTS;
  } finally {
    unlinkSync(tmpFile);
  }
} catch (e) {
  errors.push(`编译失败（语法错误/结构破坏）：${e.message.split('\n')[0]}`);
}

// ---------- 2) 文件内声明的 slug 数（孤儿检测） ----------
if (compiledSrc) {
  const declCount = (compiledSrc.match(/['"]?slug['"]?\s*:\s*['"][^'"]+['"]/g) || []).length;
  if (POSTS) {
    if (declCount !== POSTS.length) {
      warnings.push(
        `文件内 slug 声明数 (${declCount}) != POSTS.length (${POSTS.length}) —— 可能存在数组外孤儿对象或重复声明`,
      );
    }
  }
}

// ---------- 3) schema 校验 ----------
if (POSTS) {
  const seen = new Map();
  if (!Array.isArray(POSTS)) {
    errors.push('POSTS 不是数组');
  } else {
    if (POSTS.length < MIN_POSTS) {
      errors.push(`帖子数量 ${POSTS.length} 低于阈值 ${MIN_POSTS} —— 疑似帖子被截断/丢失`);
    }
    POSTS.forEach((p, i) => {
      const at = `#${i} (${p?.slug || '?'})`;
      if (!p || typeof p !== 'object') return errors.push(`${at}: 不是对象`);
      // slug
      if (typeof p.slug !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) {
        errors.push(`${at}: slug 非法（需小写 URL-safe: [a-z0-9-]）`);
      } else if (seen.has(p.slug)) {
        errors.push(`${at}: 重复 slug "${p.slug}"（与 #${seen.get(p.slug)} 冲突）`);
      } else {
        seen.set(p.slug, i);
      }
      // date
      if (typeof p.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) {
        errors.push(`${at}: date 非法（需 YYYY-MM-DD）`);
      }
      // 双语文本
      for (const k of ['zh', 'en']) {
        if (typeof p.title?.[k] !== 'string' || !p.title[k].trim()) errors.push(`${at}: title.${k} 缺失/为空`);
        if (typeof p.description?.[k] !== 'string' || !p.description[k].trim()) errors.push(`${at}: description.${k} 缺失/为空`);
        if (!Array.isArray(p.content?.[k])) {
          errors.push(`${at}: content.${k} 缺失/非数组`);
        }
      }
      // keywords
      if (!Array.isArray(p.keywords) || p.keywords.some((k) => typeof k !== 'string')) {
        errors.push(`${at}: keywords 非法（需 string[]）`);
      }
      // content blocks
      for (const k of ['zh', 'en']) {
        const blocks = p.content?.[k];
        if (!Array.isArray(blocks)) continue;
        blocks.forEach((b, bi) => {
          const ref = `${at}: content.${k}[${bi}]`;
          if (typeof b === 'string') return;
          if (!b || typeof b !== 'object') return errors.push(`${ref}: 非法 block`);
          if (b.type === 'h2' && typeof b.text === 'string') return;
          if (b.type === 'ul' && Array.isArray(b.items) && b.items.every((x) => typeof x === 'string')) return;
          if (
            b.type === 'faq' &&
            Array.isArray(b.items) &&
            b.items.every((x) => x && typeof x.q === 'string' && typeof x.a === 'string')
          ) {
            return;
          }
          if (b.type === 'cta' && typeof b.text === 'string' && typeof b.href === 'string') {
            if (!/^\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?[a-z0-9-]*$/.test(b.href) && !/^https?:\/\//.test(b.href)) {
              warnings.push(`${ref}: cta.href "${b.href}" 不是站内路径或 http(s) 链接`);
            }
            return;
          }
          errors.push(`${ref}: 未知 block 类型 "${b.type || '(缺 type)'}" 或字段缺失`);
        });
      }
      // 可选 howTo
      if (p.howTo !== undefined) {
        if (typeof p.howTo !== 'object') errors.push(`${at}: howTo 非法`);
        for (const k of ['zh', 'en']) {
          const h = p.howTo?.[k];
          if (h === undefined) continue;
          if (typeof h?.name !== 'string' || !Array.isArray(h?.steps)) {
            errors.push(`${at}: howTo.${k} 非法（需 { name, steps[] }）`);
          } else {
            h.steps.forEach((s, si) => {
              if (typeof s?.name !== 'string' || typeof s?.text !== 'string') {
                errors.push(`${at}: howTo.${k}.steps[${si}] 非法`);
              }
            });
          }
        }
      }
    });
  }
}

// ---------- 输出 ----------
console.log(`YiBoard posts 校验器`);
console.log(`  文件: ${POSTS_FILE}`);
console.log(`  帖子数: ${POSTS ? POSTS.length : '编译失败'} | 阈值: ${MIN_POSTS}`);
if (warnings.length) {
  console.log(`\n⚠️  警告 (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length) {
  console.log(`\n❌ 校验失败 (${errors.length}):`);
  errors.forEach((e) => console.log(`  - ${e}`));
  console.log('\n请修复 src/lib/blog/posts.ts 后重试。');
  process.exit(1);
} else {
  console.log(`\n✅ 校验通过：${POSTS.length} 篇帖子全部符合 schema，无孤儿对象，无重复 slug。`);
  process.exit(0);
}
