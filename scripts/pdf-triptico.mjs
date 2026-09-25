// Genera public/dataorbit-en-1-minuto.pdf a partir de la página /en-1-minuto,
// imprimiéndola con Edge o Chrome en modo headless.
//
// Requiere el servidor de desarrollo corriendo (npm run dev).
// Uso: npm run pdf:triptico                        (usa http://localhost:3000)
//      npm run pdf:triptico -- http://localhost:3002
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://localhost:3000';
const out = path.resolve('public/dataorbit-en-1-minuto.pdf');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No se encontró Edge ni Chrome. Indica la ruta con la variable CHROME_PATH.');
  process.exit(1);
}

execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    // Da tiempo a que carguen las fuentes y los logos antes de imprimir
    '--virtual-time-budget=10000',
    `--print-to-pdf=${out}`,
    `${base}/en-1-minuto`,
  ],
  { stdio: 'inherit' }
);

console.log(`PDF generado: ${out}`);
