# Evaluación

## Instrucciones

### I. Ejecución Práctica

**1)** Considere el siguiente endpoint:

```
https://jsonplaceholder.typicode.com/users
```

Programe una clase que administre la data que retorna el web service considerando las siguientes directrices:

- El constructor debe pedir la data mediante `XMLHttpRequest` y almacenarla dentro de la clase para su posterior uso.
- Debe crear métodos para:
  - Listar los nombres de todos los usuarios.
  - Pedir el nombre de un usuario por `prompt` y mostrar por consola su información básica (`username` y correo).
  - Pedir el nombre de un usuario por `prompt` y listar por consola su dirección (todos los campos).
  - Pedir el nombre de un usuario por `prompt` y listar por consola su información avanzada (teléfono, sitio web y compañía [todos los campos]).
  - Listar todas las compañías junto a su frase clave (`catchphrase`).
  - Listar los nombres de todos los usuarios ordenados alfabéticamente.
- Crear un botón HTML para llamar a cada método.
