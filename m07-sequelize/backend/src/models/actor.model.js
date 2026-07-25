// archivo: backend/src/models/actor.model.js
// definición de columnas.

const Actor = sequelize.define('Actor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false }
}, { tableName: 'actores', timestamps: false });
