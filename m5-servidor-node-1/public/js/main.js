// Lógica del frontend para mostrar películas y series en la página web.

// Función para obtener y mostrar películas
async function fetchMovies() {
    try {
        const response = await fetch("/api/movies"); // Hacer una solicitud GET a la API de películas
        const movies = await response.json(); // Parsear la respuesta JSON
        const moviesContainer = document.getElementById("movies-container"); // Obtener el contenedor de películas
        moviesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas películas
        // Iterar sobre cada película y crear elementos HTML para mostrarlas
        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie"); // Agregar clase CSS para estilo
            movieElement.innerHTML = `
                <h3>${movie.name}</h3>
                <p>Director: ${movie.director}</p>
                <p>Año: ${movie.year}</p>
            `;
            moviesContainer.appendChild(movieElement); // Agregar la película al contenedor
        });
    } catch (error) {
        console.error("Error al obtener las películas:", error); // Manejar errores en la solicitud
    } 
}

// Función para obtener y mostrar series
async function fetchSeries() {
    try {
        const response = await fetch("/api/series"); // Hacer una solicitud GET a la API de series
        const series = await response.json(); // Parsear la respuesta JSON
        const seriesContainer = document.getElementById("series-container"); // Obtener el contenedor de series
        seriesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas series
        // Iterar sobre cada serie y crear elementos HTML para mostrarlas
        series.forEach(serie => {
            const seriesElement = document.createElement("div");
            seriesElement.classList.add("series"); // Agregar clase CSS para estilo
            seriesElement.innerHTML = `
                <h3>${serie.name}</h3>
                <p>Año: ${serie.year}</p>
                <p>Temporadas: ${serie.seasons}</p>
            `;
            seriesContainer.appendChild(seriesElement); // Agregar la serie al contenedor
        });
    } catch (error) {
        console.error("Error al obtener las series:", error); // Manejar errores en la solicitud
    }   
}

// Llamar a las funciones para obtener y mostrar películas y series al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies(); // Obtener y mostrar películas
    fetchSeries(); // Obtener y mostrar series
});



// Función para manejar el envío del formulario de nueva película o serie (upload-form).
// usa el endpoint correspondiente dependiendo de si es una película o una serie.

document.getElementById("upload-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const formData = new FormData(event.target); // Obtener los datos del formulario
    const data = Object.fromEntries(formData.entries()); // Convertir los datos del formulario a un objeto

    // Determinar si se trata de una película o una serie según el valor del campo "type"
    const endpoint = data.type === "movie" ? "/api/movies" : "/api/series"; // Seleccionar el endpoint adecuado

    try {
        const response = await fetch(endpoint, {
            method: "POST", // Método POST para enviar datos
            headers: {
                "Content-Type": "application/json" // Indicar que se envía JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        });
        const result = await response.json(); // Parsear la respuesta JSON
        console.log("Datos enviados:", result); // Mostrar los datos enviados en la consola
    } catch (error) {
        console.error("Error al enviar los datos:", error); // Manejar errores en la solicitud
    }
});
