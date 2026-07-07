// 1. Primero creamos el callback (la función que mostrará el mensaje)
function mostrarMensaje(esValido) {
    if (esValido) {
        console.log("Número ingresado correctamente.");
    } else {
        console.log("Ud. ingresó caracteres incorrectos");
    }
}

// 2. Creamos la función principal que recibe el callback como parámetro
function validar_numero(callback) {
    // Desplegamos el prompt
    let input = prompt("Ingresa un número:");
    
    // Validamos si es un número. 
    // isNaN (is Not a Number) devuelve true si el texto NO es un número.
    // También validamos que no esté vacío.
    let esValido = !isNaN(input) && input.trim() !== "";
    
    // Ejecutamos el callback pasándole el resultado de la validación
    callback(esValido);
}

