CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20),
    rut TEXT NOT NULL UNIQUE,
    edad INT
);

INSERT INTO clientes (nombre, rut, edad) 
VALUES 
('Pepa', '12122122-2', 33),
('Diego', '13133133-3', 21),
('Mario', '13675924-7', 85),
('Paula', '14144251-1', 35),
('Muriela', '16555444-1', 22),
('Pato', '18188188-8', 44);

