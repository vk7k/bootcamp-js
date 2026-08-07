DROP TABLE IF EXISTS reparto_soltera_otra_vez;
CREATE TABLE reparto_soltera_otra_vez
(
    nombre character varying(255) NOT NULL,
    temporadas integer,
    protagonico boolean,
    sueldo integer,
    PRIMARY KEY (nombre)
);

insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Paz Bascuñán', 3, true, 100);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Pablo Macaya', 3, true, 100);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Cristián Arriagada', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Josefina Montané', 2, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Loreto Aravena', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Lorena Bosch', 2, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Nicolás Poblete', 2, true, 85);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Héctor Morales', 3, true, 80);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Aranzazú Yankovic', 2, true, 80);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Luis Gnecco', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Catalina Guerra', 3, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Solange Lackington', 2, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Ignacio Garmendia', 2, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Julio Gonzólez', 3, true, 75);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Antonella Orsini', 3, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Tamara Acosta', 1, false, 60);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Silvia Santelices', 1, false, 55);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Alejandro Trejo', 1, false, 55);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Grimanesa Jimínez', 1, false, 60);

DROP TABLE IF EXISTS reparto_papi_ricky;
CREATE TABLE reparto_papi_ricky
(
    nombre character varying(255) NOT NULL,
    capitulos integer,
    protagonico boolean,
    sueldo integer,
    PRIMARY KEY (nombre)
);

insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Jorge Zabaleta', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Belén Soto', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Tamara Acosta', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('María Elena Swett', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Juan Falcón', 135, true, 95);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Silvia Santelices', 135, true, 85);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Leonardo Perucci', 135, true, 85);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Teresita Reyes', 135, true, 80);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Luis Gnecco', 135, true, 75);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Alejandro Trejo', 135, true, 65);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Grimanesa Jimínez', 135, true, 60);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Remigio Remedy', 135, true, 60);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('María Paz Grandjean', 135, true, 55);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Héctor Morales', 135, true, 50);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('César Caillet', 135, true, 40);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('José Tomós Guzmún', 135, true, 25);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Manuel Aguirre', 135, true, 30);


-- PARTE 1
-- JOIN



-- Pregunta 1
-- Obtener todos los actores que participaron en ambas teleseries,
-- el sueldo que obtuvieron en cada una y la suma de ambos sueldos.
-- Ordenar por nombre del actor.


SELECT
    s.nombre,
    s.sueldo AS sueldo_soltera_otra_vez,
    p.sueldo AS sueldo_papi_ricky,
    (s.sueldo + p.sueldo) AS sueldo_total
FROM reparto_soltera_otra_vez s
INNER JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
ORDER BY s.nombre;



-- Pregunta 2
-- Obtener todos los actores que participaron exclusivamente
-- en Soltera Otra Vez, con un sueldo mayor a 90.


SELECT
    s.nombre,
    s.sueldo
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
WHERE p.nombre IS NULL
AND s.sueldo > 90
ORDER BY s.nombre;



-- Pregunta 3
-- Obtener solo los actores con sueldo inferior a 85
-- que actuaron en cualquiera de las dos teleseries,
-- pero NO en ambas.


SELECT
    s.nombre,
    s.sueldo,
    'Soltera otra vez' AS teleserie
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
WHERE p.nombre IS NULL
AND s.sueldo < 85

UNION

SELECT
    p.nombre,
    p.sueldo,
    'Papi Ricky' AS teleserie
FROM reparto_papi_ricky p
LEFT JOIN reparto_soltera_otra_vez s
    ON p.nombre = s.nombre
WHERE s.nombre IS NULL
AND p.sueldo < 85

ORDER BY nombre;


-- PARTE 2
-- MODELO RELACIONAL NORMALIZADO
-- Modelo propuesto:
-- actores 1..N reparto_actores N..1 teleseries
-- Un actor puede participar en varias teleseries.
-- Una teleserie puede tener varios actores.
--
-- La relación Muchos a Muchos (N:M) entre actores y teleseries
-- se resuelve mediante la tabla reparto_actores.


-- Eliminar tablas si existen


DROP TABLE IF EXISTS reparto_actores;
DROP TABLE IF EXISTS teleseries;
DROP TABLE IF EXISTS actores;


-- 1 Tabla: actores


CREATE TABLE actores
(
    id_actor INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);



-- 2 Tabla: teleseries


CREATE TABLE teleseries
(
    id_teleserie INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


-- 3 Tabla: reparto_actores


CREATE TABLE reparto_actores
(
    id_reparto INTEGER PRIMARY KEY,
    id_actor INTEGER NOT NULL,
    id_teleserie INTEGER NOT NULL,
    protagonico BOOLEAN NOT NULL,
    sueldo INTEGER NOT NULL,
    temporadas INTEGER,
    capitulos INTEGER,

    FOREIGN KEY (id_actor) REFERENCES actores(id_actor),
    FOREIGN KEY (id_teleserie) REFERENCES teleseries(id_teleserie)
);





-- Insertar actores
-- (Un actor aparece una sola vez)


INSERT INTO actores (id_actor, nombre) VALUES (1, 'Paz Bascuñán');
INSERT INTO actores (id_actor, nombre) VALUES (2, 'Pablo Macaya');
INSERT INTO actores (id_actor, nombre) VALUES (3, 'Cristián Arriagada');
INSERT INTO actores (id_actor, nombre) VALUES (4, 'Josefina Montané');
INSERT INTO actores (id_actor, nombre) VALUES (5, 'Loreto Aravena');
INSERT INTO actores (id_actor, nombre) VALUES (6, 'Lorena Bosch');
INSERT INTO actores (id_actor, nombre) VALUES (7, 'Nicolás Poblete');
INSERT INTO actores (id_actor, nombre) VALUES (8, 'Héctor Morales');
INSERT INTO actores (id_actor, nombre) VALUES (9, 'Aranzazú Yankovic');
INSERT INTO actores (id_actor, nombre) VALUES (10, 'Luis Gnecco');
INSERT INTO actores (id_actor, nombre) VALUES (11, 'Catalina Guerra');
INSERT INTO actores (id_actor, nombre) VALUES (12, 'Solange Lackington');
INSERT INTO actores (id_actor, nombre) VALUES (13, 'Ignacio Garmendia');
INSERT INTO actores (id_actor, nombre) VALUES (14, 'Julio González');
INSERT INTO actores (id_actor, nombre) VALUES (15, 'Antonella Orsini');
INSERT INTO actores (id_actor, nombre) VALUES (16, 'Tamara Acosta');
INSERT INTO actores (id_actor, nombre) VALUES (17, 'Silvia Santelices');
INSERT INTO actores (id_actor, nombre) VALUES (18, 'Alejandro Trejo');
INSERT INTO actores (id_actor, nombre) VALUES (19, 'Grimanesa Jiménez');
INSERT INTO actores (id_actor, nombre) VALUES (20, 'Jorge Zabaleta');
INSERT INTO actores (id_actor, nombre) VALUES (21, 'Belén Soto');
INSERT INTO actores (id_actor, nombre) VALUES (22, 'María Elena Swett');
INSERT INTO actores (id_actor, nombre) VALUES (23, 'Juan Falcón');
INSERT INTO actores (id_actor, nombre) VALUES (24, 'Leonardo Perucci');
INSERT INTO actores (id_actor, nombre) VALUES (25, 'Teresita Reyes');
INSERT INTO actores (id_actor, nombre) VALUES (26, 'Remigio Remedy');
INSERT INTO actores (id_actor, nombre) VALUES (27, 'María Paz Grandjean');
INSERT INTO actores (id_actor, nombre) VALUES (28, 'César Caillet');
INSERT INTO actores (id_actor, nombre) VALUES (29, 'José Tomás Guzmán');
INSERT INTO actores (id_actor, nombre) VALUES (30, 'Manuel Aguirre');


-- Insertar teleseries


INSERT INTO teleseries (id_teleserie, nombre)
VALUES (1, 'Soltera otra vez');

INSERT INTO teleseries (id_teleserie, nombre)
VALUES (2, 'Papi Ricky');



-- INSERT INTO reparto_actores

-- id_reparto, id_actor, id_teleserie, protagonico, sueldo, temporadas, capitulos
-- id_teleserie = 1 -> Soltera otra vez
-- id_teleserie = 2 -> Papi Ricky


INSERT INTO reparto_actores VALUES (1, 1, 1, TRUE, 100, 3, NULL);
INSERT INTO reparto_actores VALUES (2, 2, 1, TRUE, 100, 3, NULL);
INSERT INTO reparto_actores VALUES (3, 3, 1, TRUE, 95, 3, NULL);
INSERT INTO reparto_actores VALUES (4, 4, 1, TRUE, 90, 2, NULL);
INSERT INTO reparto_actores VALUES (5, 5, 1, TRUE, 95, 3, NULL);
INSERT INTO reparto_actores VALUES (6, 6, 1, TRUE, 90, 2, NULL);
INSERT INTO reparto_actores VALUES (7, 7, 1, TRUE, 85, 2, NULL);
INSERT INTO reparto_actores VALUES (8, 8, 1, TRUE, 80, 3, NULL);
INSERT INTO reparto_actores VALUES (9, 9, 1, TRUE, 80, 2, NULL);
INSERT INTO reparto_actores VALUES (10, 10, 1, TRUE, 95, 3, NULL);
INSERT INTO reparto_actores VALUES (11, 11, 1, TRUE, 90, 3, NULL);
INSERT INTO reparto_actores VALUES (12, 12, 1, TRUE, 70, 2, NULL);
INSERT INTO reparto_actores VALUES (13, 13, 1, TRUE, 70, 2, NULL);
INSERT INTO reparto_actores VALUES (14, 14, 1, TRUE, 75, 3, NULL);
INSERT INTO reparto_actores VALUES (15, 15, 1, TRUE, 70, 3, NULL);
INSERT INTO reparto_actores VALUES (16, 16, 1, FALSE, 60, 1, NULL);
INSERT INTO reparto_actores VALUES (17, 17, 1, FALSE, 55, 1, NULL);
INSERT INTO reparto_actores VALUES (18, 18, 1, FALSE, 55, 1, NULL);
INSERT INTO reparto_actores VALUES (19, 19, 1, FALSE, 60, 1, NULL);
INSERT INTO reparto_actores VALUES (20, 20, 2, TRUE, 100, NULL, 135);
INSERT INTO reparto_actores VALUES (21, 21, 2, TRUE, 100, NULL, 135);
INSERT INTO reparto_actores VALUES (22, 16, 2, TRUE, 100, NULL, 135);
INSERT INTO reparto_actores VALUES (23, 22, 2, TRUE, 100, NULL, 135);
INSERT INTO reparto_actores VALUES (24, 23, 2, TRUE, 95, NULL, 135);
INSERT INTO reparto_actores VALUES (25, 17, 2, TRUE, 85, NULL, 135);
INSERT INTO reparto_actores VALUES (26, 24, 2, TRUE, 85, NULL, 135);
INSERT INTO reparto_actores VALUES (27, 25, 2, TRUE, 80, NULL, 135);
INSERT INTO reparto_actores VALUES (28, 10, 2, TRUE, 75, NULL, 135);
INSERT INTO reparto_actores VALUES (29, 18, 2, TRUE, 65, NULL, 135);
INSERT INTO reparto_actores VALUES (30, 19, 2, TRUE, 60, NULL, 135);
INSERT INTO reparto_actores VALUES (31, 26, 2, TRUE, 60, NULL, 135);
INSERT INTO reparto_actores VALUES (32, 27, 2, TRUE, 55, NULL, 135);
INSERT INTO reparto_actores VALUES (33, 8, 2, TRUE, 50, NULL, 135);
INSERT INTO reparto_actores VALUES (34, 28, 2, TRUE, 40, NULL, 135);
INSERT INTO reparto_actores VALUES (35, 29, 2, TRUE, 25, NULL, 135);
INSERT INTO reparto_actores VALUES (36, 30, 2, TRUE, 30, NULL, 135);



-- Consulta Final
-- Mostrar todas las teleseries y los actores protagonistas


SELECT
    t.nombre AS teleserie,
    a.nombre AS actor,
    r.sueldo,
    r.temporadas,
    r.capitulos
FROM reparto_actores r
INNER JOIN actores a
    ON r.id_actor = a.id_actor
INNER JOIN teleseries t
    ON r.id_teleserie = t.id_teleserie
WHERE r.protagonico = TRUE
ORDER BY
    t.nombre,
    a.nombre;

--mejorar la consulta asisnando rol

SELECT
    t.nombre AS teleserie,
    a.nombre AS actor,
    CASE
        WHEN r.protagonico THEN 'Protagónico'
        ELSE 'Secundario'
    END AS rol,
    r.sueldo,
    COALESCE(r.temporadas, r.capitulos) AS participacion
FROM reparto_actores r
INNER JOIN actores a
    ON r.id_actor = a.id_actor
INNER JOIN teleseries t
    ON r.id_teleserie = t.id_teleserie
ORDER BY
    t.nombre,
    a.nombre;

-- consultamos solo rol protagonico
SELECT
    t.nombre AS teleserie,
    a.nombre AS actor,
    r.sueldo,
    COALESCE(r.temporadas, r.capitulos) AS participacion
FROM reparto_actores r
INNER JOIN actores a
    ON r.id_actor = a.id_actor
INNER JOIN teleseries t
    ON r.id_teleserie = t.id_teleserie
WHERE r.protagonico = TRUE
ORDER BY
    t.nombre,
    a.nombre;

  