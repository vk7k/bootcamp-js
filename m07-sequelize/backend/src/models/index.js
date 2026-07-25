// archivo: backend/src/models/index.js
// Parece buena idea tener un index.js con esto, es como el archivo "base" de la "base de datos"

const PeliculasActores = sequelize.define('PeliculasActores', {}, {
  tableName: 'peliculas_actores', timestamps: false
});

// Define las tablas

// Pelicula pertence a muchos, como tu ex. 
Pelicula.belongsToMany(Actor, { through: PeliculasActores, foreignKey: 'pelicula_id', otherKey: 'actor_id' });
Actor.belongsToMany(Pelicula, { through: PeliculasActores, foreignKey: 'actor_id', otherKey: 'pelicula_id' });