<?php
// Endpoint de envío de correo para formulario de contacto DataOrbit
// Corre de forma nativa en el hosting actual con PHP

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Leer payload JSON
$rawInput = file_get_contents('php://input');
if (empty($rawInput)) {
    $rawInput = @file_get_contents('php://stdin');
}
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$nombre   = trim($data['nombreCompleto'] ?? $data['name'] ?? '');
$empresa  = trim($data['empresa'] ?? $data['company'] ?? '');
$telefono = trim($data['telefono'] ?? $data['phone'] ?? '');
$correo   = trim($data['correo'] ?? $data['email'] ?? '');
$asunto   = trim($data['asunto'] ?? $data['subject'] ?? 'Nuevo mensaje desde el sitio web DataOrbit');
$mensaje  = trim($data['mensaje'] ?? $data['message'] ?? '');

// Validaciones básicas
if (empty($nombre) || empty($empresa) || empty($correo) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor completa todos los campos requeridos.']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'El correo electrónico ingresado no es válido.']);
    exit;
}

// Configuración del correo
$destinatario = 'contacto@dataorbit.cl';
$tituloCorreo = "[Contacto Web DataOrbit] " . htmlspecialchars($asunto);

// Cuerpo en formato HTML elegante
$cuerpoHtml = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .header { background: #1B3BA2; color: #ffffff; padding: 24px; text-align: center; }
    .header h2 { margin: 0; font-size: 22px; font-weight: bold; }
    .content { padding: 28px; color: #1e293b; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 0.5px; }
    .value { font-size: 15px; color: #0f172a; margin-top: 4px; font-weight: 500; }
    .message-box { background: #f8fafc; border-left: 4px solid #1B3BA2; padding: 16px; border-radius: 4px; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-line; }
    .footer { background: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nuevo Contacto desde dataorbit.cl</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nombre Completo</div>
        <div class="value">' . htmlspecialchars($nombre) . '</div>
      </div>
      <div class="field">
        <div class="label">Empresa</div>
        <div class="value">' . htmlspecialchars($empresa) . '</div>
      </div>
      <div class="field">
        <div class="label">Correo Electrónico</div>
        <div class="value"><a href="mailto:' . htmlspecialchars($correo) . '">' . htmlspecialchars($correo) . '</a></div>
      </div>
      <div class="field">
        <div class="label">Teléfono</div>
        <div class="value">' . htmlspecialchars($telefono ? $telefono : 'No especificado') . '</div>
      </div>
      <div class="field">
        <div class="label">Asunto</div>
        <div class="value">' . htmlspecialchars($asunto) . '</div>
      </div>
      <div class="field" style="border-bottom: none;">
        <div class="label">Mensaje</div>
        <div class="message-box">' . htmlspecialchars($mensaje) . '</div>
      </div>
    </div>
    <div class="footer">
      Mensaje generado automáticamente desde el formulario web de DataOrbit.
    </div>
  </div>
</body>
</html>
';

// Cabeceras MIME para HTML y Reply-To
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'From: DataOrbit Web <contacto@dataorbit.cl>';
$headers[] = 'Reply-To: ' . htmlspecialchars($nombre) . ' <' . $correo . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$enviado = @mail($destinatario, $tituloCorreo, $cuerpoHtml, implode("\r\n", $headers));

if ($enviado) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado exitosamente']);
} else {
    // Si la función mail del servidor falla, retornamos error para que el cliente use fallback
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'No se pudo enviar el correo a través del servidor.']);
}
?>
