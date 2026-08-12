import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const args = process.argv.slice(2);
const positional = args.find((argument, index) => !argument.startsWith('-') && args[index - 1] !== '--host' && args[index - 1] !== '--port');
const requestedRoot = positional ?? '.';
const root = resolve(requestedRoot);
const portFlag = args.indexOf('--port');
const hostFlag = args.indexOf('--host');
const port = Number(portFlag >= 0 ? args[portFlag + 1] : process.env.PORT ?? 4173);
const host = hostFlag >= 0 ? args[hostFlag + 1] : '0.0.0.0';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const relative = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]+/, '');
  let file = join(root, relative || 'index.html');
  if (!file.startsWith(root)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) file = join(root, 'index.html');
  response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  createReadStream(file).pipe(response);
}).listen(port, host, () => {
  console.log(`Locobotics AI website: http://localhost:${port}`);
});
