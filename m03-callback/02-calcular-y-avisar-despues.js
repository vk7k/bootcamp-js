// 1. Creamos el callback que imprimirá el mensaje final
function imprimirResultado(resultado) {
    console.log(`El valor de la sumatoria es ${resultado}. Este resultado se obtuvo hace 5 segundos.`);
}

// 2. Creamos la función principal
function calcular_y_avisar_despues(numero, callback) {
    let sumaImpares = 0;
    
    // Calculamos la sumatoria de impares
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) { // Si el residuo de dividir por 2 no es 0, es impar
            sumaImpares += i;
        }
    }
    
    // Usamos setTimeout para esperar 5000 milisegundos (5 segundos)
    setTimeout(function() {
        // Una vez pasados los 5 segundos, ejecutamos el callback
        callback(sumaImpares);
    }, 5000);
}

