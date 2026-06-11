window.alert("Ingrese 3 números para ordenarlos de menor a mayors");
let lista = [];

for (let i = 0; i < 3; i++) {
    let contador = i + 1;
    let num = parseFloat(prompt(`Ingrese el número ${contador}:`));
    if (!isNaN(num)) {  // Validar que sea un número
        lista.push(num);
    } else {
        console.log("No ingresaste un número válido");
        i--;  // Repetir la iteración
    }
}

    do {
        n=0;
        for (let i = 0; i < lista.length - 1; i++) 
            if (lista[i-1] > lista[i]) {
                temp=lista[i-1];
                lista[i-1]=lista[i];
                lista[i]=temp;
                n=1;
            }

    } while (n!=0);


    if (lista[0] == lista[lista.length - 1]) {
        document.write("Los números son iguales");
    } else {
        document.write("el menor de los números es: " + lista[0] + "<br>");
        document.write("el mayor de los números es: " + lista[lista.length - 1]);
    }