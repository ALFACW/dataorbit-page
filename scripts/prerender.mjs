// Pre-renderiza el home: deja su HTML ya armado dentro de dist/index.html, para
// que el teléfono muestre el contenido sin esperar a que cargue el JavaScript.
// Las demás rutas usan dist/app.html (la página vacía de siempre), que el
// .htaccess sirve para todo lo que no es un archivo real.
//
// Se corre después de `vite build` y `vite build --ssr src/entry-server.jsx`
// (ver el script "build" de package.json).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const shell = readFileSync(path.join(dist, 'index.html'), 'utf-8');
const placeholder = '<div id="root"></div>';
if (!shell.includes(placeholder)) {
  throw new Error(`No se encontró ${placeholder} en dist/index.html`);
}

const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const html = render('/');

writeFileSync(path.join(dist, 'app.html'), shell);
writeFileSync(path.join(dist, 'index.html'), shell.replace(placeholder, `<div id="root">${html}</div>`));
rmSync('dist-ssr', { recursive: true, force: true });

console.log(`Home pre-renderizado (${Math.round(html.length / 1024)} KB de HTML); app.html para las demás rutas`);
