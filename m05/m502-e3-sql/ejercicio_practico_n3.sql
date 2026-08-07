-- base para el ejercicio

DROP TABLE IF EXISTS finanzas_personales;

CREATE TABLE finanzas_personales
(
    nombre character varying(20) COLLATE pg_catalog."default" NOT NULL,
    me_debe integer,
    cuotas_cobrar integer,
    le_debo integer,
    cuotas_pagar integer,
    CONSTRAINT finanzas_personales_pkey PRIMARY KEY (nombre)
);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('tía carmen', 0, 0, 5000, 1);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('papá', 0, 0, 15000, 3);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('nacho', 10000, 2, 7000, 1);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('almacén esquina', 0, 0, 13000, 2);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('vicios varios', 0, 0, 35000, 35);

insert into finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
values ('compañero trabajo', 50000, 5, 0, 0);

select * from finanzas_personales;



-- Pregunta 1
-- ¿A quién(es) le debe más dinero y cuánto?


SELECT nombre, le_debo
FROM finanzas_personales
WHERE le_debo = (
    SELECT MAX(le_debo)
    FROM finanzas_personales
);
-- Respuesta : vicios varios le_debo 35000


-- Pregunta 2
-- ¿Quién(es) le debe más dinero a usted y cuánto?


SELECT nombre, me_debe
FROM finanzas_personales
WHERE me_debe = (
    SELECT MAX(me_debe)
    FROM finanzas_personales
);

-- Respuesta :compañero trabajo me debe 50000 


-- Pregunta 3
-- ¿Cuánto dinero debe en total?


SELECT SUM(le_debo) AS deuda_total
FROM finanzas_personales;

-- Respuesta :deuda_total(le_debo) 75000

-- ¿Cuánto dinero me deben en total?

SELECT SUM(me_debe) AS "Me deben"
FROM finanzas_personales

-- Respuesta : Me deben 60000

-- Pregunta 4
-- ¿Cuánto dinero debe en promedio?


SELECT AVG(le_debo) AS promedio_deuda
FROM finanzas_personales;

-- Respuesta : promedio_deuda(le_debo) 12500


-- Pregunta 5
-- ¿Cuántos meses demoraría en saldar su deuda?


SELECT SUM(cuotas_pagar) AS meses
FROM finanzas_personales;

-- Respuesta : 42 meses

/*

Nivel experto 

42 meses equivalen a:

3 años y 6 meses

SELECT
    SUM(cuotas_pagar) / 12 AS años,
    SUM(cuotas_pagar) % 12 AS meses
FROM finanzas_personales;


*/


-- Pregunta 6
-- Si cobra todo lo que le deben y utiliza ese dinero para pagar
-- sus deudas


-- Nueva deuda

SELECT
    SUM(le_debo) - SUM(me_debe) AS nueva_deuda
FROM finanzas_personales;

-- Respuesta :nueva deuda reducida 15000

-- Pago mensual considerando las cuotas actuales



SELECT
TRUNC(
    (SUM(le_debo) - SUM(me_debe)) / SUM(cuotas_pagar)
) AS "Valor cuota"
FROM finanzas_personales;

-- Respuesta :Valor cuota 357


-- Pregunta 7
-- Insertar un nuevo registro


INSERT INTO finanzas_personales
(nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)

VALUES
('Pareja',0,0,50000,1);

-- revisamos como quedo la tabla con el nuevo dato

select * from finanzas_personales;


-- Pregunta 8
-- ¿Cuánto será la cuota a pagar este mes?


SELECT
SUM(le_debo / cuotas_pagar) AS "cuota mes"
FROM finanzas_personales
WHERE cuotas_pagar > 0;

-- Respuesta : cuota mes 74500


-- Pregunta 9
-- Actualizar las cuotas del almacén a 13.


UPDATE finanzas_personales
SET cuotas_pagar = 13
WHERE nombre = 'almacén esquina';


-- revisamos como quedo la tabla con el cambio de cuotas

select * from finanzas_personales;


-- Pregunta 10
-- ¿Cuánto será ahora la cuota mensual?


SELECT
SUM(le_debo / cuotas_pagar) AS cuota_mensual
FROM finanzas_personales
WHERE cuotas_pagar > 0;

-- Respuesta : nueva cuota mensual 69000