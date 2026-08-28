import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [html, relayvo, privacy, terms, css, script, robots, sitemap, build, vercel, ogImage, logo] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../relayvo.html', import.meta.url), 'utf8'),
  readFile(new URL('../privacy.html', import.meta.url), 'utf8'),
  readFile(new URL('../terms.html', import.meta.url), 'utf8'),
  readFile(new URL('../styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../script.js', import.meta.url), 'utf8'),
  readFile(new URL('../robots.txt', import.meta.url), 'utf8'),
  readFile(new URL('../sitemap.xml', import.meta.url), 'utf8'),
  readFile(new URL('../build.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
  readFile(new URL('../og-image.png', import.meta.url)),
  readFile(new URL('../logo-512.png', import.meta.url)),
]);

test('all production sections and navigation targets exist', () => {
  for (const id of ['top', 'capabilities', 'company', 'contact']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
    assert.match(html, new RegExp(`href=["']#${id}["']`));
  }
  assert.equal((html.match(/<section\b/g) ?? []).length, 7);
});

test('Relayvo is the single flagship product and has a dedicated route', () => {
  assert.match(html, /href=["']\/relayvo["']/);
  assert.match(html, /The orchestration layer for WhatsApp Business autonomy/);
  assert.doesNotMatch(html, /IN THE LAB/);
  assert.match(relayvo, /<h1>WhatsApp Business autonomy/);
  assert.match(relayvo, /Not another<br \/>WhatsApp <em>chatbot/);
  assert.match(relayvo, /Human approvals/);
});

test('content remains visible without JavaScript', () => {
  assert.match(css, /\.reveal\{opacity:1;transform:none\}/);
  assert.doesNotMatch(css, /\.reveal\{opacity:0/);
});

test('enhancements have failure-safe behavior', () => {
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /showEverything/);
  assert.match(script, /setTimeout\(showEverything/);
});

test('site has production metadata and no external runtime dependency', () => {
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<title>Locobotics AI/);
  assert.doesNotMatch(html, /<script[^>]+src=["']https?:\/\//);
  assert.doesNotMatch(html, /<link[^>]+(?:stylesheet|icon)[^>]+href=["']https?:\/\//);
});

test('homepage has a complete technical SEO foundation', () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/www\.locoboticsai\.in\/"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /type="application\/ld\+json"/);
  assert.match(html, /"@type": "Organization"/);
  assert.match(html, /"@type": "WebSite"/);
  const structuredData = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(structuredData);
  assert.doesNotThrow(() => JSON.parse(structuredData));
  const cspHash = createHash('sha256').update(structuredData).digest('base64');
  assert.match(vercel, new RegExp(`sha256-${cspHash.replace(/[+/?=]/g, '\\$&')}`));
});

test('Relayvo page has unique indexable product SEO', () => {
  assert.equal((relayvo.match(/<h1\b/g) ?? []).length, 1);
  assert.match(relayvo, /<title>Relayvo \| WhatsApp Business Autonomy Orchestration<\/title>/);
  assert.match(relayvo, /rel="canonical" href="https:\/\/www\.locoboticsai\.in\/relayvo"/);
  assert.match(relayvo, /property="og:url" content="https:\/\/www\.locoboticsai\.in\/relayvo"/);
  assert.match(relayvo, /"@type": "SoftwareApplication"/);
  const structuredData = relayvo.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(structuredData);
  assert.doesNotThrow(() => JSON.parse(structuredData));
  const cspHash = createHash('sha256').update(structuredData).digest('base64');
  assert.match(vercel, new RegExp(`sha256-${cspHash.replace(/[+/?=]/g, '\\$&')}`));
});

test('crawl files use the verified www canonical host', () => {
  assert.match(robots, /Sitemap: https:\/\/www\.locoboticsai\.in\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/www\.locoboticsai\.in\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.locoboticsai\.in\/relayvo<\/loc>/);
  assert.doesNotMatch(sitemap, /https:\/\/locoboticsai\.in/);
});

test('legal pages are linked, canonical and excluded from indexing', () => {
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /href="\/terms"/);
  for (const page of [privacy, terms]) {
    assert.match(page, /name="robots" content="noindex, follow"/);
    assert.match(page, /rel="canonical" href="https:\/\/www\.locoboticsai\.in\//);
  }
});

test('production build includes every SEO asset', () => {
  for (const file of ['relayvo.html', 'privacy.html', 'terms.html', 'logo-512.png', 'og-image.png', 'robots.txt', 'sitemap.xml']) {
    assert.match(build, new RegExp(`['"]${file.replace('.', '\\.') }['"]`));
  }
  assert.equal(ogImage.readUInt32BE(16), 1200);
  assert.equal(ogImage.readUInt32BE(20), 630);
  assert.equal(logo.readUInt32BE(16), 512);
  assert.equal(logo.readUInt32BE(20), 512);
});

test('all workflow CTAs open the enquiry form instead of an email client', () => {
  assert.doesNotMatch(html, /mailto:[^"']*Design/);
  assert.doesNotMatch(relayvo, /mailto:/);
  assert.equal((relayvo.match(/data-inquiry-open/g) ?? []).length, 3);
  assert.equal((html.match(/data-inquiry-open/g) ?? []).length, 1);
  assert.match(script, /id="inquiry-form"/);
  assert.match(script, /fetch\('\/api\/inquiry'/);
  assert.match(script, /aria-live="polite"/);
  assert.match(vercel, /connect-src 'self'/);
});
