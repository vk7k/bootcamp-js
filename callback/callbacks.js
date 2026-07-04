// Función para validar un número ingresado por el usuario
function validar_numero(callback) {
    let dato = prompt("Ingrese un número:");
    if (!isNaN(dato) && dato.trim() !== "") {
        callback(true, parseFloat(dato));
    } else {
        callback(false, "Usted ingresó caracteres incorrectos");
    }
}

// Función para calcular sumatoria de números impares y avisar después de 5 segundos
function calcular_y_avisar_despues(numero, callback) {
    let sumatoria = 0;
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            sumatoria += i;
        }
    }

    setTimeout(() => {
        callback(sumatoria);
    }, 5000);
}

// Función para calcular sumatorias sucesivas y avisar según el resultado
function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
    let resultado = 0;
    let mensaje = "";

    for (let i = 1; i <= numero; i++) {
        resultado += i;
        mensaje += i;
        if (i < numero) {
            mensaje += " + ";
        }
    }

    if (resultado < 1000) {
        callback(mensaje, resultado);
    } else {
        callback_error(mensaje, resultado);
    }
}

// Función principal para ejecutar el flujo completo
function ejecutarPrograma() {
    // Validar número
    validar_numero((esValido, dato) => {
        if (esValido) {
            console.log("Número válido:", dato);

            // Calcular y avisar después de 5 segundos
            calcular_y_avisar_despues(dato, (sumatoria) => {
                console.log(`El valor de la sumatoria es ${sumatoria}. Este resultado se obtuvo hace 5 segundos`);
            });

            // Calcular y avisar dependiendo del resultado
            calcular_y_avisar_dependiendo(dato, (mensaje, resultado) => {
                console.log(`Las sumatorias sucesivas de ${mensaje} es ${resultado}`);
            }, (mensaje, resultado) => {
                console.log(`El número sobrepasa el objetivo de la función. Las sumatorias sucesivas de ${mensaje} es ${resultado}`);
            });
        } else {
            console.log(dato);
        }
    });
}

// Ejecutar el programa
ejecutarPrograma();
