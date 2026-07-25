// Todo en sus archivitos aparte como niños grandes.
// importación de bibliotecas/librerías:

import express from 'express';
import cors from 'cors';
import { sequelize } from './backend/src/models/index.js';

// Importamos los routers ya cocinados
import peliculasRoutes from './backend/src/routes/peliculas.routes.js';
import actoresRoutes from './backend/src/routes/actores.routes.js';
import asignarRoutes from './backend/src/routes/asignar.routes.js';

const app = express();

// Middlewares
app.use(cors()); // que no bloquee las requests entre back y front
app.use(express.json()); // hablemos en json


// ==========================================
// CONEXIÓN DE RUTAS 🤘
// ==========================================
// Aquí le decimos a Express qué ruta base usar para cada archivo
app.use('/peliculas', peliculasRoutes);
app.use('/actores', actoresRoutes);
app.use('/asignar-actor', asignarRoutes);

// ==========================================
// INICIAR SERVIDOR Y SINCRONIZAR BD
// ==========================================
const PORT = 3000;

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Tablas sincronizadas en PostgreSQL');
        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });