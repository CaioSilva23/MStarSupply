import os


def conecta():
    db_host = os.getenv('POSTGRES_HOST', "")
    db_name = os.getenv('POSTGRES_DB', "")
    db_user = os.getenv('POSTGRES_USER', "")
    db_password = os.getenv('POSTGRES_PASSWORD', "")
    port = os.getenv('POSTGRES_PORT', "")

    return f'postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{port}/{db_name}'

conexao = conecta()

