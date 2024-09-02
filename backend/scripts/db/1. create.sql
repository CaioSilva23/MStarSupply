CREATE DATABASE postgres;

-- tabela mercadoria
CREATE TABLE mercadoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    numero_registro VARCHAR(100) UNIQUE NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    quantidade INTEGER DEFAULT 0
);

-- ENUM para tipo_operacao
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_operacao_enum') THEN
        CREATE TYPE tipo_operacao_enum AS ENUM ('entrada', 'saida');
    END IF;
END
$$;

-- tabela operacao
CREATE TABLE IF NOT EXISTS operacao (
    id SERIAL PRIMARY KEY,
    tipo_operacao tipo_operacao_enum NOT NULL,
    quantidade INTEGER NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(100) NOT NULL,
    mercadoria_id INTEGER NOT NULL,
    FOREIGN KEY (mercadoria_id) REFERENCES mercadoria (id)
);


-- insert mercadorias
INSERT INTO mercadoria (nome, numero_registro, fabricante, tipo, descricao) VALUES
('iPhone 14 Pro', 'REG-001', 'Apple', 'Smartphone', 'Smartphone Apple'),
('Samsung Galaxy S22', 'REG-002', 'Samsung', 'Smartphone', 'Smartphone Android'),
('PlayStation 5', 'REG-003', 'Sony', 'Console de Jogos', 'Console de videogame'),
('Dell XPS 13', 'REG-004', 'Dell', 'Laptop', 'Laptop'),
('MacBook Pro 16"', 'REG-005', 'Apple', 'Laptop', 'Laptop'),
('AirPods Pro', 'REG-006', 'Apple', 'Fones de Ouvido', 'Fones de ouvido'),
('Kindle Paperwhite', 'REG-007', 'Amazon', 'E-reader', 'Leitor de e-books'),
('Sony WH-1000XM4', 'REG-008', 'Sony', 'Fones de Ouvido', 'Fones de ouvido'),
('NVIDIA GeForce RTX 3080', 'REG-009', 'NVIDIA', 'Placa de Vídeo', 'Placa de vídeo'),
('GoPro HERO10', 'REG-010', 'GoPro', 'Câmera de Ação', 'Câmera compacta');
