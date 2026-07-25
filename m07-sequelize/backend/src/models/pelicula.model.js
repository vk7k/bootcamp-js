// archivo: backend/src/models/pelicula.model.js
// Crea el modelo película con los campos id, titulo y anio (year no sería mejor??? anio anio anio)
// se crea el modelo película, pero también "Película"
// es lo mismo que CREATE TABLE en SQL
// el método define hace esto:
// define (Nombre de la tabla, {columnas, cada elemento con nombre:propiedades}, {opciones de la tabla})


// el método define hace esto: (Nombre de la tabla, {columnas}, {opciones})
const Pelicula = sequelize.define('Pelicula', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(150), allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: false } 
}, { tableName: 'peliculas', timestamps: false });

export default Pelicula;