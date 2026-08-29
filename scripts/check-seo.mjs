/**
 * SEO enhancements for near-win pages
 * - Add structured data to about page
 * - Add FAQ schema to rankings page
 * - Optimize index.html meta
 */

import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/l\'x/WorkBuddy/2026-08-04-13-14-21/yiboard/src/app/[locale]';

// 1. Check what SEO improvements we can make
console.log('=== SEO Enhancement Plan ===\n');

// Check about page
const aboutPage = path.join(baseDir, 'about/page.tsx');
if (fs.existsSync(aboutPage)) {
  const content = fs.readFileSync(aboutPage, 'utf-8');
  console.log('About page exists:', aboutPage);
  console.log('Has metadata:', content.includes('generateMetadata'));
  console.log('Has revalidate:', content.includes('revalidate'));
}

// Check rankings page
const rankingsPage = path.join(baseDir, 'rankings/page.tsx');
if (fs.existsSync(rankingsPage)) {
  const content = fs.readFileSync(rankingsPage, 'utf-8');
  console.log('\nRankings page exists:', rankingsPage);
  console.log('Has metadata:', content.includes('generateMetadata'));
  console.log('Has revalidate:', content.includes('revalidate'));
}

// Check blog page
const blogPage = path.join(baseDir, 'blog/page.tsx');
if (fs.existsSync(blogPage)) {
  const content = fs.readFileSync(blogPage, 'utf-8');
  console.log('\nBlog page exists:', blogPage);
  console.log('Has metadata:', content.includes('generateMetadata'));
  console.log('Has revalidate:', content.includes('revalidate'));
}

// Check glossary page (Japan traffic source)
const glossaryPage = path.join(baseDir, 'glossary/page.tsx');
if (fs.existsSync(glossaryPage)) {
  const content = fs.readFileSync(glossaryPage, 'utf-8');
  console.log('\nGlossary page exists:', glossaryPage);
  console.log('Has metadata:', content.includes('generateMetadata'));
  console.log('Has revalidate:', content.includes('revalidate'));
}

// Check puzzle page (Japan traffic source)
const puzzlePage = path.join(baseDir, 'puzzle/page.tsx');
if (fs.existsSync(puzzlePage)) {
  const content = fs.readFileSync(puzzlePage, 'utf-8');
  console.log('\nPuzzle page exists:', puzzlePage);
  console.log('Has metadata:', content.includes('generateMetadata'));
  console.log('Has revalidate:', content.includes('revalidate'));
}

// Check sitemap for near-win pages
const sitemap = path.join(baseDir, '../sitemap.xml/route.ts');
if (fs.existsSync(sitemap)) {
  const content = fs.readFileSync(sitemap, 'utf-8');
  console.log('\nSitemap exists:', sitemap);
  console.log('Has PATHS:', content.includes('PATHS'));
}

console.log('\n=== Recommendations ===');
console.log('1. Create /ko locale pages (ko.json + routing)');
console.log('2. Add structured data to about page (FAQ schema)');
console.log('3. Optimize blog page meta (current: force-dynamic)');
console.log('4. Add glossary to sitemap (Japan traffic)');
