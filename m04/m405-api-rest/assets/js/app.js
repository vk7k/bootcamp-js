/********************************************************************
 * ACTIVIDAD API REST - RICK AND MORTY
 *
 * Archivo: app.js
 *
 * Descripción:
 * Consume la API de Rick and Morty utilizando Fetch API.
 * La información se obtiene solo una vez y luego se almacena
 * en memoria para evitar llamadas innecesarias al servidor.
 ********************************************************************/

/********************************************************************
 * CONSTANTES
 ********************************************************************/

const URL =
"https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10";

/********************************************************************
 * VARIABLES GLOBALES
 ********************************************************************/

// Almacena los personajes obtenidos desde la API

let personajes = [];

// Indica si los datos ya fueron cargados

let datosCargados = false;

/********************************************************************
 * EVENTOS
 ********************************************************************/

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnObtener")
        .addEventListener("click", obtenerPersonajes);

    document
        .getElementById("btnAgrupar")
        .addEventListener("click", agruparPorEspecie);

    document
        .getElementById("btnFicha")
        .addEventListener("click", mostrarFicha);

});

/********************************************************************
 * OBTENER PERSONAJES
 ********************************************************************/

/*
    Obtiene los primeros 10 personajes.

    Si los datos ya fueron descargados,
    utiliza la información almacenada
    en memoria.
*/

async function obtenerPersonajes(){

    if(datosCargados){

        mostrarTabla();

        return;

    }

    try{

        const respuesta = await fetch(URL);

        personajes = await respuesta.json();

        datosCargados = true;

        mostrarTabla();

        cargarSelect();

    }

    catch(error){

        console.error(error);

        alert("Error al consumir la API.");

    }

}

/********************************************************************
 * MOSTRAR TABLA
 ********************************************************************/

/*
    Recorre el arreglo de personajes
    y genera una fila por cada registro.
*/

function mostrarTabla(){

    const tabla = document.getElementById("tablaPersonajes");

    tabla.innerHTML = "";

    personajes.forEach(personaje => {

        tabla.innerHTML += `

        <tr>

            <td>${personaje.id}</td>

            <td>

                <img
                    src="${personaje.image}"
                    class="foto-miniatura"
                    alt="${personaje.name}">

            </td>

            <td>${personaje.name}</td>

            <td>${personaje.species}</td>

        </tr>

        `;

    });

}

/********************************************************************
 * CARGAR SELECT
 ********************************************************************/

/*
    Llena el combo con todos
    los personajes descargados.
*/

function cargarSelect(){

    const select = document.getElementById("selectPersonaje");

    select.innerHTML =
    `<option value="">Seleccione un personaje...</option>`;

    personajes.forEach(personaje=>{

        select.innerHTML += `

        <option value="${personaje.id}">

            ${personaje.name}

        </option>

        `;

    });

}

/********************************************************************
 * MOSTRAR FICHA
 ********************************************************************/

/*
    Busca un personaje por su ID
    y genera una tarjeta Bootstrap.
*/

function mostrarFicha(){

    const id = Number(document.getElementById("selectPersonaje").value);

    if(id===0){

        alert("Seleccione un personaje.");

        return;

    }

    const personaje =
    personajes.find(p=>p.id===id);

    const contenedor =
    document.getElementById("contenedorFicha");

    contenedor.innerHTML =

    `
    <div class="card personaje-card sombra">

        <img
            src="${personaje.image}"
            class="card-img-top"
            alt="${personaje.name}">

        <div class="card-body">

            <h3>${personaje.name}</h3>

            <p>

                <strong>ID:</strong>
                ${personaje.id}

            </p>

            <p>

                <strong>Especie:</strong>
                ${personaje.species}

            </p>

        </div>

    </div>
    `;

}

/********************************************************************
 * AGRUPAR POR ESPECIE
 ********************************************************************/

/*
    Agrupa los personajes utilizando
    reduce().
*/

function agruparPorEspecie(){

    if(!datosCargados){

        alert("Primero debe obtener los personajes.");

        return;

    }

    const agrupados = personajes.reduce((grupo, personaje)=>{

        if(!grupo[personaje.species]){

            grupo[personaje.species]=[];

        }

        grupo[personaje.species].push(personaje);

        return grupo;

    },{});

    let html="";

    Object.keys(agrupados)

    .sort()

    .forEach(especie=>{

        html+=`<h4>${especie}</h4>`;

        html+="<ul>";

        agrupados[especie].forEach(personaje=>{

            html+=`

            <li>

                ${personaje.name}

                (ID: ${personaje.id})

            </li>

            `;

        });

        html+="</ul>";

    });

    document.getElementById("resultadoAgrupacion").innerHTML=html;

}