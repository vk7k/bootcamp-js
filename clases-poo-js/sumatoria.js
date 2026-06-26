class Sumatoria {
    constructor(numeroBase) {
        this.base = numeroBase;
        this.numeroActual = numeroBase;
        this.acumulado = numeroBase;
        
        // CUMPLIMIENTO DE REQUISITO: La 1ra línea sale del constructor
        console.log(`[Constructor] Objeto Sumatoria instanciado. Base inicial: ${this.base}`);
    }

    sumar() {
        this.numeroActual++; 
        this.acumulado += this.numeroActual;
        
        // CUMPLIMIENTO DE REQUISITO: Siguientes líneas salen del método
        console.log(`[sumar()] Se sumó el progresivo (${this.numeroActual}) -> Sumatoria acumulada: ${this.acumulado}`);
    }
}

// 1. Generar número aleatorio entre 1 y 10
let baseAleatoria = Math.floor(Math.random() * 10) + 1;

// 2. Crear el objeto (esto dispara automáticamente el console.log del constructor)
const miSumatoria = new Sumatoria(baseAleatoria);

// 3. Puente con el botón del navegador
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const boton = document.getElementById('btnEjecutar');
        if (boton) {
            boton.addEventListener('click', () => {
                miSumatoria.sumar();
            });
        }
    });
}