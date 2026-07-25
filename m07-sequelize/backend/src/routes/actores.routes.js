//Las rutas para obtener y crear actores
//Archivo: backend/src/routes/actores.routes.js

import { Router } from 'express';
import { Actor, Pelicula } from '../models/index.js';

const router = Router();

// GET /actores
router.get('/', async (req, res) => {
    try {
        const actores = await Actor.findAll({ 
            include: { model: Pelicula, through: { attributes: [] } } 
        });
        res.json(actores);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los actores' });
    }
});

// POST /actores
router.post('/', async (req, res) => {
    try {
        const { nombre, fecha_nacimiento } = req.body;
        const nuevoActor = await Actor.create({ nombre, fecha_nacimiento });
        res.status(201).json(nuevoActor);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear el actor' });
    }
});

export default router;