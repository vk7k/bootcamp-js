const express = require("express"); // Importar el framework Express
const path = require("path"); // Módulo para manejar rutas de archivos
const fs = require("fs"); // Módulo para manejar el sistema de archivos

const app = express(); // Crear una instancia de la aplicación Express
const PORT = 3000; // Puerto en el que se ejecutará el servidor

// Rutas de archivos de datos
const moviesPath = path.join(__dirname, "data", "db-movies.js");
const seriesPath = path.join(__dirname, "data", "db-series.js");


app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

// Configuración de rutas para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public"))); // Servir archivos estáticos desde la carpeta public


// API para lectura de las películas y series
function readData(filePath) {
    try{
        const data = fs.readFileSync(filePath, "utf-8"); // Leer el archivo de datos
        return JSON.parse(data); // Parsear el contenido del archivo a un objeto JavaScript
    } catch (error) {
        console.error("Error al leer el archivo:", error); // Manejar errores al leer el archivo
        return []; // Retornar un arreglo vacío en caso de error
    }
}

// Configuración de las rutas para obtener películas y series desde la API
app.get("/api/movies", (req, res) => {
    const movies = readData(moviesPath); // Leer los datos de películas
    res.json(movies); // Enviar los datos de películas como respuesta JSON
}   );

app.get("/api/series", (req, res) => {
    const series = readData(seriesPath); // Leer los datos de series
    res.json(series); // Enviar los datos de series como respuesta JSON
});    



// API para cargar películas y series
app.post("/api/movies", (req, res) => {


    // Leer el archivo de películas y convertirlo en un objeto JavaScript
    const movies = readData(moviesPath); // Leer los datos de películas existentes
    const newMovie = req.body; // Obtener la nueva película del cuerpo de la solicitud
    console.log("Datos recibidos:", newMovie); 

    fs.writeFileSync(moviesPath, JSON.stringify([...movies, newMovie])); // Guardar el nuevo arreglo de películas en el archivo
    res.status(201).json(newMovie); // Enviar la nueva película como respuesta con código de estado 201 (creado) 

});

app.post("/api/series", (req, res) => {
    // Leer el archivo de series y convertirlo en un objeto JavaScript
    const series = readData(seriesPath); // Leer los datos de series existentes
    const newSeries = req.body; // Obtener la nueva serie del cuerpo de la solicitud
    console.log("Datos recibidos:", newSeries);
    
    fs.writeFileSync(seriesPath, JSON.stringify([...series, newSeries])); // Guardar el nuevo arreglo de series en el archivo
    res.status(201).json(newSeries); // Enviar la nueva serie como respuesta con código de estado 201 (creado)  
});

// Log de inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`); // Iniciar el servidor y mostrar mensaje en consola
});


