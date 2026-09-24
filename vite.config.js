import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';

// Plugin para ejecutar /api/contacto.php en el servidor local de desarrollo de Vite usando PHP CLI
const phpApiDevPlugin = () => ({
  name: 'php-api-dev-server',
  configureServer(server) {
    server.middlewares.use('/api/contacto.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
      }

      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        const phpScriptPath = path.resolve(__dirname, 'public/api/contacto.php');

        // Ejecutar PHP CLI pasando el body
        const phpProcess = spawn('php', [
          '-d', 'display_errors=1',
          phpScriptPath
        ], {
          env: {
            ...process.env,
            REQUEST_METHOD: 'POST',
            CONTENT_TYPE: 'application/json',
            CONTENT_LENGTH: Buffer.byteLength(body),
          },
        });

        let output = '';
        let errorOutput = '';

        phpProcess.stdin.write(body);
        phpProcess.stdin.end();

        phpProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        phpProcess.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });

        phpProcess.on('close', (code) => {
          res.setHeader('Content-Type', 'application/json');

          // Si el script devolvió JSON válido
          const jsonMatch = output.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed.success) {
                res.statusCode = 200;
                res.end(JSON.stringify(parsed));
                return;
              }
              // Si falló por mail() local de Windows, continuamos al simulador de dev
            } catch {}
          }

          // En desarrollo local en Windows donde no hay servidor de correo sendmail/SMTP configurado localmente:
          // Mostramos el log en consola de Vite y respondemos success simulado en dev
          try {
            const formData = JSON.parse(body);
            console.log('\n📧 [LOCAL DEV] Formulario de Contacto recibido con éxito:');
            console.log('   👤 Nombre:   ', formData.nombreCompleto || formData.name);
            console.log('   🏢 Empresa:  ', formData.empresa || formData.company);
            console.log('   ✉️  Correo:   ', formData.correo || formData.email);
            console.log('   📞 Teléfono: ', formData.telefono || formData.phone);
            console.log('   📝 Asunto:   ', formData.asunto || formData.subject);
            console.log('   💬 Mensaje:  ', formData.mensaje || formData.message);
            console.log('   (En producción en cPanel se envía directamente con el correo del servidor)\n');

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              message: 'Mensaje procesado correctamente en entorno de desarrollo.'
            }));
          } catch {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Procesado' }));
          }
        });
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), phpApiDevPlugin()],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
});
