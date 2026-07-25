// archivo: src/backend/config/sequelize.js

import { Sequelize } from 'sequelize';

// Conexión a PostgreSQL (usuario postgres, sin clave, BD m7)
const sequelize = new Sequelize('postgres://postgres@localhost:5432/m7'); 

export default sequelize;