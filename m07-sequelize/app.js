import { Sequelize, DataTypes } from 'sequelize'; // importa Sequelize y DataTypes desde el paquete 'sequelize'

// Configura la conexión a la base de datos PostgreSQL
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/m7'); 

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 


//Listar con relaciones (incluye asociados):

// GET /peliculas
Pelicula.findAll({ include: { model: Actor, through: { attributes: [] } } });
// GET /actores
Actor.findAll({ include: { model: Pelicula, through: { attributes: [] } } });
Asignar actor a película con transacción:

// POST /asignar-actor  { pelicula_id, actor_id }
await sequelize.transaction(async (t) => {
  await PeliculasActores.create({ pelicula_id, actor_id }, { transaction: t });
  // aquí podrías hacer más operaciones relacionadas dentro de la misma transacción
});