const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'catalogo.json');

app.use(express.json());

async function leerCatalogo() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(DATA_PATH, '[]');
      return [];
    }
    throw e;
  }
}

async function escribirCatalogo(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

app.get('/libros', async (_req, res) => {
  const libros = await leerCatalogo();
  res.status(200).json({ ok: true, data: libros });
});

app.post('/libros', async (req, res) => {
  const { titulo, autor, anio } = req.body;
  if (!titulo || !autor || !Number.isInteger(anio)) {
    return res.status(400).json({ ok: false, mensaje: 'Datos inválidos' });
  }
  const libros = await leerCatalogo();
  const nuevoId = Math.max(0, ...libros.map((l) => l.id)) + 1;
  const nuevo = { id: nuevoId, titulo, autor, anio };
  libros.push(nuevo);
  await escribirCatalogo(libros);
  res.status(201).json({ ok: true, data: nuevo });
});

app.put('/libros/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, anio } = req.body;
  if (!Number.isInteger(id) || !titulo || !autor || !Number.isInteger(anio)) {
    return res.status(400).json({ ok: false, mensaje: 'Datos inválidos' });
  }
  const libros = await leerCatalogo();
  const idx = libros.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ ok: false, mensaje: 'No encontrado' });
  libros[idx] = { id, titulo, autor, anio };
  await escribirCatalogo(libros);
  res.status(200).json({ ok: true, data: libros[idx] });
});

app.delete('/libros/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido' });
  }
  const libros = await leerCatalogo();
  const idx = libros.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ ok: false, mensaje: 'No encontrado' });
  const eliminado = libros.splice(idx, 1)[0];
  await escribirCatalogo(libros);
  res.status(200).json({ ok: true, data: eliminado });
});

app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
