//Archivo: backend/src/routes/peliculas.routes.js

import { Router } from 'express'; // express provee de funciones de rutas, que es lo que se usa acá
import { Pelicula, Actor } from '../models/index.js';  // importar desde el index.js, los modelos ya cocinados y listos

const router = Router();

//router.get tiene "/" para que en app.js le asignemos /peliculas

//GET
//dame películas
router.get('/', async (req, res) => {

    // try-catch, como los niños con dientes.
    try {
        const peliculas = await Pelicula.findAll({ 
            include: { model: Actor, through: { attributes: [] } } 
        });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener las películas' });
    }
});

//POST
//crea películas
//todo siempre con try-catch, ya tamos grandes.

router.post('/', async (req, res) => {
    try {
        const { titulo, anio } = req.body;
        const nuevaPelicula = await Pelicula.create({ titulo, anio });
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear la película' });
    }
});

export default router;