/ 1. CLASE PADRE
class Taxi {
    constructor(patente, marca, modelo, tipoCarga) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.tipoCarga = tipoCarga; // "Personas" o "Carga"
    }

    obtenerDatos() {
        return `Vehículo ${this.marca} ${this.modelo} [Patente: ${this.patente}] - Transporta: ${this.tipoCarga}`;
    }
}

// 2. SUBCLASES DIRECTAS

class TaxiTradicional extends Taxi {
    constructor(patente, marca, modelo) {
        super(patente, marca, modelo, "Personas");
        this.techo = "Amarillo";
        this.licenciaConductor = "A1";
    }
}

class TaxiParticular extends Taxi {
    constructor(patente, marca, modelo) {
        super(patente, marca, modelo, "Personas");
        this.licenciaConductor = "B";
    }
}

class TaxiCargo extends Taxi {
    constructor(patente, marca, modelo, capacidadKg) {
        super(patente, marca, modelo, "Carga");
        this.capacidadCargaKg = capacidadKg;
    }
}

// 3. SUBCLASES DE TAXI PARTICULAR (Nivel 3)

class TaxiExpress extends TaxiParticular {
    constructor(patente, marca, modelo) {
        super(patente, marca, modelo);
        this.categoria = "Auto típico";
    }
}

class TaxiPremium extends TaxiParticular {
    constructor(patente, marca, modelo, comodidadesExtras) {
        super(patente, marca, modelo);
        this.categoria = "Auto de mayor categoría";
        this.comodidades = comodidadesExtras;
    }
}

// --- VERIFICACIÓN EN CONSOLA ---
console.log("--- ESCENARIO TAXIS ---");
const trad = new TaxiTradicional("AB-CD-12", "Nissan", "Versa");
const exp = new TaxiExpress("XY-ZW-99", "Toyota", "Yaris");
const prem = new TaxiPremium("JJ-KK-11", "Mercedes-Benz", "Clase C", ["Asientos de cuero", "Wi-Fi"]);
const cargo = new TaxiCargo("FGT-45", "Peugeot", "Partner", 800);

console.log(trad);
console.log(prem);
console.log(cargo.obtenerDatos());