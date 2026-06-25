class Alumno {
  constructor(nombre, edad, carrera) {
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
  }

  mostrarInfo() {
    console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}, Carrera: ${this.carrera}`);
  }
}



class BandaMusical {
  constructor(nombre, genero, integrantes, discos) {
    this.nombre = nombre;
    this.genero = genero;
    this.integrantes = integrantes;
    this.discos = discos; // Array
  }

  mostrarInfo() {
    console.log(`Banda: ${this.nombre}, Género: ${this.genero}, Integrantes: ${this.integrantes}`);
  }

  listarDiscos() {
    console.log("Discos:", this.discos.join(", "));
  }
}



class Perro {
  constructor(nombre, raza, edad) {
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
  }

  mostrarInfo() {
    console.log(`Nombre: ${this.nombre}, Raza: ${this.raza}, Edad: ${this.edad}`);
  }

  ladrar() {
    console.log("¡Guau guau!");
  }
}
