import { Sequelize } from 'sequelize';

// Configura la conexión a la base de datos PostgreSQL
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/m7'); 

export default sequelize;