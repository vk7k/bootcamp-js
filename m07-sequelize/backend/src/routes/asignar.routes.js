//Archivo: backend/src/routes/asignar.routes.js
//Esta es la de la TRANSACCIÓN que pide el ejercicio


import { Router } from 'express';
import { sequelize, PeliculasActores } from '../models/index.js';

const router = Router();

// POST /asignar-actor
router.post('/', async (req, res) => {
    try {
        const { pelicula_id, actor_id } = req.body;

        await sequelize.transaction(async (t) => {
            await PeliculasActores.create({ pelicula_id, actor_id }, { transaction: t });
        });

        res.status(201).json({ mensaje: 'Actor asignado a la película exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error en la transacción al asignar' });
    }
});

export default router;