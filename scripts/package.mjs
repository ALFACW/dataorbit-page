// Empaqueta dist/ en dataorbit-deploy.zip, listo para descomprimir en public_html (cPanel).
//
// Usa el tar de Windows (bsdtar), que escribe las rutas con "/". Compress-Archive de
// PowerShell 5 las escribe con "\" y el servidor Linux las descomprime como nombres
// de archivo en vez de carpetas (api\contacto.php en lugar de api/contacto.php).
import { execFileSync } from 'node:child_process';
import { readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const out = path.resolve('dataorbit-deploy.zip');
rmSync(out, { force: true });

// readdirSync incluye los archivos que parten con punto, como .htaccess
const files = readdirSync('dist');
const tar =
  process.platform === 'win32'
    ? path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe')
    : 'bsdtar';

execFileSync(tar, ['-a', '-c', '-f', out, ...files], { cwd: 'dist', stdio: 'inherit' });
console.log(`Paquete listo: ${out}`);
