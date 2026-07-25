// archivo: backend/src/models/index.js
// Este archivo concentra todo lo de la base de datos.

import sequelize from '../config/sequelize.js'; // se trae el objeto Sequelize conectado a la base de datos y todo, listo pa usar
import Pelicula from './pelicula.model.js'; // modelo de película, objeto Pelicula listo pa usar
import Actor from './actor.model.js'; // modelo de actor con todos su parámetros ,devuelve objeto Actor listo pa usar. 


// Tabla intermedia aquí.
// mas abajo se define con qué se llena (son relaciones, pares de ids)
const PeliculasActores = sequelize.define('PeliculasActores', {}, {
  tableName: 'peliculas_actores', timestamps: false
});

// Las relaciones N:M se definen aquí
// esto es con belongsToMany (como tu ex)
// Entonces, recibe el nombre del objeto, a través de qué tabla se conecta con otra, y cuáles van a ser los pares de llaves para conectar. 
// al final del día, la tabla PeliculasActores va a tener puras rows con pelicula_id y actor_id 

Pelicula.belongsToMany(Actor, { through: PeliculasActores, foreignKey: 'pelicula_id', otherKey: 'actor_id' });
Actor.belongsToMany(Pelicula, { through: PeliculasActores, foreignKey: 'actor_id', otherKey: 'pelicula_id' });


// Este export es el que vale, lleva el sequelize para operar, y los tres objetos de datos ya conectados y con su estructura.
export { sequelize, Pelicula, Actor, PeliculasActores };