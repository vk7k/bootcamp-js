const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [type, token] = hdr.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ ok: false, mensaje: 'Token requerido' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, mensaje: 'Token inválido o expirado' });
  }
};

module.exports.requireRole = function requireRole(role) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ ok: false, mensaje: 'No tienes permisos para esta acción' });
    }
    next();
  };
};
