// Publica dist/ en public_html del cPanel por FTP seguro (FTPS) y después verifica
// que el sitio y Mowi sigan respondiendo.
//
// Uso: npm run deploy   (compila y publica)
//
// Las credenciales van en .env.deploy, que no se sube a GitHub (ver .env.deploy.example):
//   FTP_HOST      servidor del hosting (pyme117.pymedns.net)
//   FTP_USER      cuenta FTP cuyo directorio es public_html
//   FTP_PASSWORD  su contraseña
//   FTP_DIR       carpeta de destino dentro de la cuenta FTP (por defecto "/")
//
// Solo sube y reemplaza los archivos del sitio: nunca borra nada del servidor, así
// que las carpetas de otras plataformas en public_html (mowi.dataorbit.cl, api...)
// no se tocan. Sube primero los archivos nuevos (JS, CSS, imágenes), después el
// .htaccess y al final los HTML, para que nadie reciba una página que apunte a
// archivos que todavía no llegan.
import { Client } from 'basic-ftp';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const leerEnv = (archivo) => {
  if (!existsSync(archivo)) {
    console.error(`Falta ${archivo}. Cópialo desde .env.deploy.example y completa la contraseña.`);
    process.exit(1);
  }
  const env = {};
  for (const linea of readFileSync(archivo, 'utf-8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
};

const listar = (dir, base = dir) =>
  readdirSync(dir).flatMap((nombre) => {
    const ruta = path.join(dir, nombre);
    return statSync(ruta).isDirectory() ? listar(ruta, base) : [path.relative(base, ruta).split(path.sep).join('/')];
  });

// Orden de subida: primero lo que las páginas usan, al final las páginas
const prioridad = (archivo) => (archivo.endsWith('.html') ? 2 : archivo === '.htaccess' ? 1 : 0);

const env = leerEnv('.env.deploy');
for (const clave of ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD']) {
  if (!env[clave]) {
    console.error(`Falta ${clave} en .env.deploy`);
    process.exit(1);
  }
}
const destino = env.FTP_DIR || '/';

const archivos = listar('dist').sort((a, b) => prioridad(a) - prioridad(b));
console.log(`Subiendo ${archivos.length} archivos a ${env.FTP_HOST}${destino} ...`);

const client = new Client(60000);
try {
  await client.access({ host: env.FTP_HOST, user: env.FTP_USER, password: env.FTP_PASSWORD, secure: true });
  for (const archivo of archivos) {
    const carpeta = path.posix.dirname(archivo);
    await client.cd(destino);
    if (carpeta !== '.') await client.ensureDir(carpeta);
    await client.uploadFrom(path.join('dist', archivo), path.posix.basename(archivo));
  }
  console.log('Archivos subidos.');
} catch (error) {
  console.error('Error al subir por FTP:', error.message);
  process.exit(1);
} finally {
  client.close();
}

// Verificación: el sitio nuevo responde y las plataformas vecinas siguen igual
const revisar = async (url, { contiene, redireccion = 'follow' } = {}) => {
  try {
    const res = await fetch(url, { redirect: redireccion, headers: { 'Cache-Control': 'no-cache' } });
    const texto = contiene ? await res.text() : '';
    const ok = res.status < 400 && (!contiene || texto.includes(contiene));
    console.log(`${ok ? 'OK ' : 'MAL'}  ${res.status}  ${url}`);
    return ok;
  } catch (error) {
    console.log(`MAL  ---  ${url}  (${error.message})`);
    return false;
  }
};

console.log('\nVerificando...');
const resultados = await Promise.all([
  revisar('https://dataorbit.cl/', { contiene: 'Preparamos tu empresa' }),
  revisar('https://dataorbit.cl/eduorbit'),
  revisar('https://dataorbit.cl/en-1-minuto'),
  revisar('https://mowi.dataorbit.cl/'),
  revisar('http://mowi.dataorbit.cl/', { redireccion: 'manual' }),
]);

if (resultados.every(Boolean)) {
  console.log('\nListo: el sitio está publicado y Mowi sigue respondiendo.');
} else {
  console.error('\nAlgo no respondió bien. Revisar antes de seguir (el respaldo está en /home/dataorbi/wordpress-respaldo).');
  process.exit(1);
}
