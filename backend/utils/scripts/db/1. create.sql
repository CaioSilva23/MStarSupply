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