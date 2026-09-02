import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
const files = [
  'index.html',
  'relayvo.html',
  'whatsapp-orchestration-vs-chatbot.html',
  'relayvo-customer-onboarding.html',
  'privacy.html',
  'terms.html',
  'styles.css',
  'script.js',
  'analytics.js',
  'favicon.svg',
  'logo-512.png',
  'og-image.png',
  'robots.txt',
  'sitemap.xml',
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(files.map((file) => cp(path.join(root, file), path.join(output, file))));
console.log(`Production site built in ${output}`);
