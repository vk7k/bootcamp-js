// Genera un número entre el 1 y el 10
const secreto = Math.floor(Math.random() * 10) + 1;

// Array para guardar números ya usados, para evitar que el usuario repita números
const usados = [];

const historial = document.getElementById('historial');
const mensaje = document.getElementById('mensaje');

function mostrar(texto) {
  mensaje.innerHTML = texto;
}

let gano = false;

for (let i = 0; i < 3; i++) {
  mostrar('Te quedan ' + (3 - i) + ' intentos');

  const adivina = parseInt(prompt('Adivina el número entre 1 y 10:'));

  if (isNaN(adivina) || adivina < 1 || adivina > 10) {
    alert('Por favor, ingresa un número válido entre 1 y 10.');
    continue;
  }

  if (usados.includes(adivina)) {
    alert('Ya has usado ese número, intenta con otro.');
    continue;
  }

  usados.push(adivina);
  historial.innerHTML += 'Intento ' + (i + 1) + ': ' + adivina + '<br>';

  if (adivina === secreto) {
    mostrar('¡GANASTE!');
    gano = true;
    break;
  }
}

if (!gano) {
  mostrar('Sin aciertos. El número era: ' + secreto);
}

