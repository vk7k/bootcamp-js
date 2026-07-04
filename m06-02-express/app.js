const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // 1. Importamos Morgan
const path = require('path');

const app = express();

app.use(cors()); // 2. Habilitamos CORS segun indicaion para todas las rutas
app.use(express.json());
app.use(morgan('dev'));


// --- DATOS SIMULADOS (los del sql adjunto, pero pasados a JSON) ---
const conductores = [
  { id: 1, nombre: "Don Pepe", edad: 55 },
  { id: 2, nombre: "Pedro", edad: 25 },
  { id: 3, nombre: "Maria", edad: 33 },
  { id: 4, nombre: "Francisco", edad: 19 },
  { id: 5, nombre: "Camilo", edad: 29 },
  { id: 6, nombre: "Andres", edad: 35 },
  { id: 7, nombre: "Mario", edad: 48 },
  { id: 8, nombre: "Felipe", edad: 33 }
];

const automoviles = [
  { id: 1, marca: "Ford", patente: "HXJH55", nombre_conductor: "Felipe" },
  { id: 2, marca: "Toyota", patente: "HLSA26", nombre_conductor: "Pedro" },
  { id: 3, marca: "Mercedes", patente: "JFTS47", nombre_conductor: "Maria" },
  { id: 4, marca: "Chevrolet", patente: "RTPP97", nombre_conductor: "Francisco" },
  { id: 5, marca: "Nissan", patente: "SDTR51", nombre_conductor: "Don Pepe" },
  { id: 6, marca: "Mazda", patente: "RDCS19", nombre_conductor: "Francisco" },
  { id: 7, marca: "Kia", patente: "KDTZ28", nombre_conductor: "Don Pepe" },
  { id: 8, marca: "Jeep", patente: "FFDF88", nombre_conductor: "Paulina" },
  { id: 9, marca: "Suzuki", patente: "DRTS41", nombre_conductor: "Heriberto" },
  { id: 10, marca: "Honda", patente: "BXVZ67", nombre_conductor: "Manuel" }
];

// --- RUTAS DE LA API ---

// 1. GET /conductores: Retorna todos los conductores cuando le damos una solicitud a http://localhost:3000/conductores
app.get('/conductores', (req, res) => {
  res.status(200).json(conductores);
});

// 2. GET /automoviles: Retorna todos los automóviles cuando le damos una solicitud a http://localhost:3000/automoviles
app.get('/automoviles', (req, res) => {
  res.status(200).json(automoviles);
});

// 3. GET /conductoressinauto?edad=<numero>: 
// retorna conductores menores de <numero> años que no tienen automóvil.

app.get('/conductoressinauto', (req, res) => {
  const edadLimite = Number(req.query.edad);

  //aquí FILTER recorre el array de conductores, guarda en c a cada conductor y lo filtra según la condición que le pasemos.
  //Primera condición:      c.edad < edadLimite, que es la edad que precibe el query
  //Segunda condición:      c.nombre no debe estar en la tabla de automóviles (por eso es !automoviles... parte con !)

  const resultado = conductores.filter(c => 
    c.edad < edadLimite && !automoviles.some(a => a.nombre_conductor === c.nombre)
  );

  res.status(200).json(resultado);
});

// 4. GET /solitos: retorna conductores sin automóvil y automóviles sin conductor.
 app.get('/solitos', (req, res) => {
    const conductoresSinAuto = conductores.filter(c => !automoviles.some(a => a.nombre_conductor === c.nombre)); // lo mismo que en conductoressinauto
    const automovilesSinConductor = automoviles.filter(a => !conductores.some(c => c.nombre === a.nombre_conductor)); // lo mismo que en conductoressinauto pero al revés

    res.status(200).json({ conductoresSinAuto, automovilesSinConductor });
 });


// 5 y 6. GET /auto?patente=<string> o GET /auto?iniciopatente=<letra>
// intenté crear dos app.get para auto, pero no funcionaba, así que lo hice en uno solo y con condicionales.
// no puede haber dos app.get con el mismo path, porque el primero que se cumpla se ejecuta y el otro no. 


app.get('/auto', (req, res) => {
  const patente = req.query.patente;
  const iniciopatente = req.query.iniciopatente;

  if (patente) {
    const auto = automoviles.find(a => a.patente === patente);

    if (!auto) {
      return res.status(404).json({ error: 'No se encontró un automóvil con esa patente' });
    }

    const conductor = conductores.find(c => c.nombre === auto.nombre_conductor);
    return res.status(200).json({ auto, conductor });
  }

  if (iniciopatente) {
    const autos = automoviles.filter(a => a.patente.startsWith(iniciopatente));
    return res.status(200).json(autos);
  }

  return res.status(400).json({ error: 'Debes enviar patente o iniciopatente como query param' });
});



// Encender el servidor (leyendo variable de entorno o puerto 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



//---- SEGUNDA PARTE: Servidor estático html
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
