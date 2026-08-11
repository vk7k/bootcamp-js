# Biblioteca API - Catálogo de Libros

API REST construida con Node.js + Express que gestiona un catálogo de libros persistido en un archivo JSON local (`catalogo.json`) usando `fs/promises`.

## Requisitos

- Node.js >= 14

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev   # desarrollo con nodemon
npm start     # producción
```

## Endpoints

| Método | Ruta            | Descripción                          | Respuestas                         |
|--------|-----------------|--------------------------------------|------------------------------------|
| POST   | `/libros`       | Crea un libro                        | 201 Created / 400 Bad Request      |
| GET    | `/libros`       | Lista todos los libros               | 200 OK                             |
| PUT    | `/libros/:id`   | Actualiza el libro indicado          | 200 OK / 400 / 404 Not Found       |
| DELETE | `/libros/:id`   | Elimina el libro indicado            | 200 OK / 400 / 404 Not Found       |

El cuerpo de las peticiones se envía en JSON con los campos `titulo`, `autor` y `anio` (año como número entero).

## Formato de respuesta

Éxito: `{ "ok": true, "data": ... }`
Error: `{ "ok": false, "mensaje": "detalle" }`

## Pruebas rápidas

```bash
npm run dev
```

```bash
curl -s http://localhost:3000/libros

curl -s -X POST http://localhost:3000/libros \
  -H 'Content-Type: application/json' \
  -d '{"titulo":"Rayuela","autor":"Julio Cortázar","anio":1963}'

curl -s -X PUT http://localhost:3000/libros/1 \
  -H 'Content-Type: application/json' \
  -d '{"titulo":"Cien años de soledad","autor":"G. G. Márquez","anio":1967}'

curl -s -X DELETE http://localhost:3000/libros/2
```
