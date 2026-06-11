//Genera un número entre el 1 y el 10
const secreto = Math.floor(Math.random() * 10) + 1;

//Array para guardar numeros ya usados, para evitar que el usuario repita números
const usados = [];

//Usar un prompt para pedir al usuario que adivine el número.
//Valida que el número esté entre el 1 y el 10, y que no se haya usado antes.
let adivina;
do {
  adivina = parseInt(prompt("Adivina el número entre 1 y 10:"));
    if (isNaN(adivina) || adivina < 1 || adivina > 10) {
    alert("Por favor, ingresa un número válido entre 1 y 10.");
    } else if (usados.includes(adivina)) {
    alert("Ya has usado ese número, intenta con otro.");
    } else {
    usados.push(adivina);
    if (adivina === secreto) {
      alert("¡Felicidades! Has adivinado el número secreto.");
    }
    }
} while (adivina !== secreto);

