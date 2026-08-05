# Ejercicio Práctico - Subida de imágenes con Express + Multer

## Actividad — Subida de imágenes con Express + Multer (backend + frontend básico)

## Introducción / Objetivo

Implementar la subida de archivos en un servidor Express utilizando Multer, aplicando validaciones de tipo MIME y tamaño, y disponibilizando una interfaz HTML (Bootstrap) para probar la carga. El objetivo es comprender el flujo de upload, su seguridad básica y el manejo de archivos en el servidor.

## Descripción de la actividad

### Parte A — Backend (API de subida)

- Crear proyecto y dependencias: `express`, `multer`, (opcional) `mime-types`.
- Configurar carpeta `uploads/` para guardar imágenes.
- Implementar `POST /upload` que acepte una sola imagen en el campo `foto`.
- Extensiones/MIME permitidos: `jpg`, `jpeg`, `png` (opcional: `gif`).
- Límite de tamaño: **5 MB**.
- Guardar con nombre único (p. ej. `Date.now() + ext`).
- Retornar JSON con resultado (ruta/nombre) y códigos HTTP adecuados (`201` al éxito; `400`/`415` para inválidos).

### Parte B — Frontend (página de prueba con Bootstrap)

- Servir estáticos desde `public/` (`app.use(express.static('public'))`).
- Crear `public/index.html` con un formulario:
  - `method="POST"`, `action="/upload"`, `enctype="multipart/form-data"`.
  - `<input type="file" name="foto" accept="image/*" required>`
- Mostrar mensajes de éxito/error bajo el formulario (`div .alert`) usando JS simple.

### Notas de validación (obligatorias)

- La validación real ocurre en el backend (no confiar sólo en `accept="image/*"`).
- Rechazar archivos que excedan 5 MB o no sean imagen válida → mensaje claro + código HTTP correcto.

---

## Guías técnicas sugeridas (opcionales)

### Estructura sugerida

```
mi-app-subida/
├─ uploads/            # se crea si no existe
├─ public/
│  └─ index.html
├─ server.js
├─ package.json
└─ README.md
```

### Instalación

```bash
npm init -y
npm i express multer
npm i -D nodemon
```

### Scripts (package.json)

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Servidor mínimo (server.js)

```javascript
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 3000;

// asegurar carpeta uploads
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// almacenamiento con nombre único
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${ext}`);
  }
});

// filtros y límites
const fileFilter = (_req, file, cb) => {
  const ok = /image\/(jpeg|png|gif)/.test(file.mimetype);
  ok ? cb(null, true) : cb(new Error('Tipo de archivo no permitido. Solo jpg, jpeg, png, gif.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// estáticos
app.use(express.static(path.join(__dirname, 'public')));

// endpoint de subida
app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, mensaje: 'No se recibió una imagen válida' });
  }
  res.status(201).json({
    ok: true,
    mensaje: 'Imagen subida',
    archivo: req.file.filename,
    ruta: `/uploads/${req.file.filename}`
  });
});

// manejo básico de errores de Multer
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    // p.ej. límite de tamaño
    return res.status(400).json({ ok: false, mensaje: err.message });
  }
  if (err) {
    return res.status(415).json({ ok: false, mensaje: err.message });
  }
  res.status(500).json({ ok: false, mensaje: 'Error interno' });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
```

### Frontend mínimo (public/index.html)

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Subir imagen — Foto Talento</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-5" style="max-width: 720px;">
    <h1 class="mb-4">Subir imagen</h1>
    <form id="formUpload" action="/upload" method="POST" enctype="multipart/form-data" class="border rounded p-4 bg-white">
      <div class="mb-3">
        <label for="inputFoto" class="form-label">Seleccione una imagen (jpg, jpeg, png, gif) máx. 5MB</label>
        <input type="file" class="form-control" id="inputFoto" name="foto" accept="image/*" required>
      </div>
      <button class="btn btn-primary" type="submit">Subir</button>
    </form>

    <div id="feedback" class="mt-4" style="display:none;"></div>
  </div>

  <script>
    const form = document.getElementById('formUpload');
    const feedback = document.getElementById('feedback');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch('/upload', { method: 'POST', body: data });
        const json = await res.json();
        feedback.style.display = 'block';
        feedback.className = 'alert ' + (json.ok ? 'alert-success' : 'alert-danger');
        feedback.textContent = json.mensaje || (json.ok ? 'OK' : 'Error');
      } catch (err) {
        feedback.style.display = 'block';
        feedback.className = 'alert alert-danger';
        feedback.textContent = 'Error de red';
      }
    });
  </script>
</body>
</html>
```

### Pruebas rápidas (opcional)

```bash
npm run dev
# prueba con curl (reemplaza imagen.jpg por una real)
curl -F "foto=@./imagen.jpg" http://localhost:3000/upload
```