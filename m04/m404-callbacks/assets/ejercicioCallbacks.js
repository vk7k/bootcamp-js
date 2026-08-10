function mostrarResultado(mensaje) {
    document.getElementById('resultado').textContent = mensaje;
    console.log(mensaje);
}

function validar_numero(callback) {
    let dato = prompt('Ingrese un número:');

    if (dato !== null && dato.trim() !== '' && !isNaN(dato)) {
        callback(`Correcto. Ingresaste el número: ${dato}`);
    } else {
        callback('Error. Usted ingresó caracteres incorrectos');
    }
}

function mostrarValidacion(mensaje) {
    mostrarResultado(mensaje);
}

function calcular_y_avisar_despues(numero, callback) {
    let suma = 0;

    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            suma += i;
        }
    }

    setTimeout(() => {
        callback(`El valor de la sumatoria es ${suma}. Este resultado se obtuvo hace 5 segundos.`);
    }, 5000);
}

function mostrarResultadoAsincrono(mensaje) {
    mostrarResultado(mensaje);
}

function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
    let total = 0;

    for (let i = 1; i <= numero; i++) {
        total += i;
        console.log(`Sumatoria parcial: ${total}`);
    }

    if (total < 1000) {
        callback(`Las sumatorias sucesivas de ${numero} es ${total}`);
    } else {
        callback_error(`El número sobrepasa el objetivo de la función. Resultado obtenido: ${total}`);
    }
}

function mostrarResultadoExitoso(mensaje) {
    mostrarResultado(mensaje);
}

function mostrarResultadoError(mensaje) {
    mostrarResultado(mensaje);
}
