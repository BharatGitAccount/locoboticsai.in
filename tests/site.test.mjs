import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [html, css, script] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../script.js', import.meta.url), 'utf8'),
]);

test('all production sections and navigation targets exist', () => {
  for (const id of ['top', 'products', 'capabilities', 'company', 'contact']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
    assert.match(html, new RegExp(`href=["']#${id}["']`));
  }
  assert.equal((html.match(/<section\b/g) ?? []).length, 7);
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

test('site has production metadata and no external asset dependency', () => {
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<title>Locobotics AI/);
  assert.doesNotMatch(html, /https?:\/\//);
});
