SELECT * FROM clientes
WHERE rut = '13133133-3';

SELECT * FROM clientes
WHERE edad > 25;

SELECT * FROM clientes
WHERE nombre not like 'Mario';

SELECT * FROM clientes
WHERE rut like '13%';

SELECT * FROM clientes
WHERE nombre like '%a';

SELECT * FROM clientes
WHERE nombre like 'P%' and edad > '34';

SELECT * FROM clientes
WHERE rut like '1%' and nombre not like 'M%' and edad < 40;

SELECT * FROM clientes
WHERE (rut like '13%' or rut like '%1') and nombre IN('Diego','Mario','Pato','Pepa') and edad BETWEEN 20 and 80;
