require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs/promises');
const path = require('path');
const auth = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_PATH = path.join(__dirname, 'usuarios.json');

app.use(express.json());

async function leerUsuarios() {
  try {
    const raw = await fs.readFile(USERS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(USERS_PATH, '[]');
      return [];
    }
    throw e;
  }
}

async function escribirUsuarios(usuarios) {
  await fs.writeFile(USERS_PATH, JSON.stringify(usuarios, null, 2));
}

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, mensaje: 'Email y password son requeridos' });
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return res.status(400).json({ ok: false, mensaje: 'Email con formato inválido' });
  }
  if (password.length < 6) {
    return res.status(400).json({ ok: false, mensaje: 'La password debe tener al menos 6 caracteres' });
  }

  const usuarios = await leerUsuarios();
  if (usuarios.some((u) => u.email === email)) {
    return res.status(409).json({ ok: false, mensaje: 'Email ya registrado' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  usuarios.push({ email, passwordHash, role: 'user' });
  await escribirUsuarios(usuarios);

  return res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, mensaje: 'Email y password son requeridos' });
  }

  const usuarios = await leerUsuarios();
  const user = usuarios.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { sub: email, email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '15m' }
  );

  return res.status(200).json({ ok: true, token });
});

app.get('/api/perfil', auth, (req, res) => {
  res.status(200).json({ ok: true, data: { email: req.user.email, role: req.user.role } });
});

app.get('/api/admin', auth, auth.requireRole('admin'), (req, res) => {
  res.status(200).json({ ok: true, mensaje: 'Solo para administradores' });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

app.listen(PORT, () => console.log(`API segura en http://localhost:${PORT}`));
