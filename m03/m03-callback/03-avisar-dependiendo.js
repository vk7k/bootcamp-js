// 1. Creamos el callback para cuando todo sale bien (menor a 1000)
function callback_exito(numero, resultado) {
    console.log(`Las sumatorias sucesivas de ${numero} es ${resultado}`);
}

// 2. Creamos el callback para cuando da error (1000 o mayor)
function callback_error(numero, resultado) {
    console.log(`El número sobrepasa el objetivo de la función. El resultado fue ${resultado}`);
}

// 3. Creamos la función principal que recibe DOS callbacks
function calcular_y_avisar_dependiendo(numero, callback, callbackError) {
    let sumaTotal = 0;
    let sumaParcial = 0;
    
    // Calculamos las sumatorias sucesivas
    for (let i = 1; i <= numero; i++) {
        sumaParcial += i;       // Va sumando: 1, luego 1+2(3), luego 1+2+3(6)...
        sumaTotal += sumaParcial; // Suma los resultados anteriores: 1 + 3 + 6...
    }
    
    // Evaluamos el resultado para decidir qué callback ejecutar
    if (sumaTotal < 1000) {
        callback(numero, sumaTotal);
    } else {
        callbackError(numero, sumaTotal);
    }
}

