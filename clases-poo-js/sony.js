class ProductoSony {
    constructor(nombre, modelo, precio, categoria) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.categoria = categoria;
    }

    mostrarInformacion() {
        console.log(`[${this.categoria.toUpperCase()}] ${this.nombre} (Mod: ${this.modelo}) | Precio: $${this.precio.toLocaleString('es-CL')}`);
    }
}

class Televisor extends ProductoSony {
    constructor(nombre, modelo, precio, pulgadas, resolucion) {
        super(nombre, modelo, precio, "Televisores");
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`   └─ Detalles: Pantalla de ${this.pulgadas}" con resolución ${this.resolucion}`);
    }
}

class Camara extends ProductoSony {
    constructor(nombre, modelo, precio, megapixeles, incluyeLente) {
        super(nombre, modelo, precio, "Cámaras");
        this.megapixeles = megapixeles;
        this.incluyeLente = incluyeLente;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`   └─ Detalles: Sensor de ${this.megapixeles}MP | Kit con lente: ${this.incluyeLente ? 'Sí' : 'Solo cuerpo'}`);
    }
}

class Audio extends ProductoSony {
    constructor(nombre, modelo, precio, tipoSubcategoria, cancelacionRuido) {
        super(nombre, modelo, precio, "Audio");
        this.tipoSubcategoria = tipoSubcategoria; // Ej: "Audífono", "Barra de sonido"
        this.cancelacionRuido = cancelacionRuido;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`   └─ Detalles: ${this.tipoSubcategoria} | ANC (Cancelación de ruido): ${this.cancelacionRuido ? 'Sí' : 'No'}`);
    }
}

class Consola extends ProductoSony {
    constructor(nombre, modelo, precio, capacidadSSD, edicionDigital) {
        super(nombre, modelo, precio, "PlayStation / Consolas");
        this.capacidadSSD = capacidadSSD;
        this.edicionDigital = edicionDigital;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`   └─ Detalles: SSD ${this.capacidadSSD} | Lector de discos: ${this.edicionDigital ? 'No (100% Digital)' : 'Sí'}`);
    }
}

// --- VERIFICACIÓN EN CONSOLA ---
console.log("\n--- ESCENARIO SONY CHILE ---");
const tv = new Televisor("BRAVIA XR OLED", "XR-55A80L", 1299990, 55, "4K HDR");
const cam = new Camara("Alpha 7 IV", "ILCE-7M4K", 2899990, 33, true);
const aud = new Audio("WH-1000XM5", "WH1000XM5/B", 349990, "Audífonos de Diadema", true);
const ps5 = new Consola("PlayStation 5 Slim", "CFI-2015", 549990, "1TB", false);

tv.mostrarInformacion();
cam.mostrarInformacion();
aud.mostrarInformacion();
ps5.mostrarInformacion();