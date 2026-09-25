# Cómo publicar el sitio en dataorbit.cl

El sitio vive en el cPanel del hosting (cuenta `dataorbi`), dentro de `public_html`.

```
npm run deploy
```

Compila el sitio (con el home pre-renderizado), sube los archivos por FTP seguro y
verifica que dataorbit.cl y Mowi sigan respondiendo. Tarda un par de minutos.

## Primera vez

1. En cPanel → **Cuentas FTP**, crear una cuenta (por ejemplo `deploy`) con el
   directorio **`public_html`**. Ojo: cPanel propone `public_html/deploy`; hay que
   dejarlo en `public_html`.
2. Copiar `.env.deploy.example` como `.env.deploy` y completar la contraseña.
   `.env.deploy` no se sube a GitHub.

## Lo que hay que saber

- **En `public_html` también vive Mowi** (`mowi.dataorbit.cl`), que es una plataforma
  en producción, además de `api.dataorbit.cl` y `firma`. El script nunca borra nada del
  servidor: solo sube y reemplaza los archivos del sitio.
- **`public/.htaccess` aplica también a Mowi.** Conserva el manejador de PHP 8.1 de
  cPanel y la regla de respaldo que usaba WordPress; las reglas del sitio nuevo solo
  aplican a dataorbit.cl y www. El original está en `htaccess-wordpress-original.txt`.
- **`index.html` trae el home pre-renderizado** y `app.html` es la página vacía que el
  `.htaccess` sirve para el resto de las rutas (/eduorbit, /en-1-minuto).
- Si se cambia el contenido del tríptico, regenerar el PDF con `npm run pdf:triptico`
  (con `npm run dev` corriendo).
