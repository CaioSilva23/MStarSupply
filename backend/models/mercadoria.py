from utils import db
from marshmallow import Schema, fields


class MercadoriaModel(db.Model):
    __tablename__ = 'mercadoria'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)
    numero_registro = db.Column(db.String(100), unique=True, nullable=False)
    fabricante = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)

    operacoes = db.relationship('OperacaoModel', backref='mercadoria', lazy=True)


    def __init__(self, nome, numero_registro, fabricante, tipo, descricao):
        self.nome = nome
        self.numero_registro = numero_registro
        self.fabricante = fabricante
        self.tipo = tipo
        self.descricao = descricao

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_to_db(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()
        return self


class MercadoriaSchema(Schema):
    id = fields.Int(dump_only=True)
    nome = fields.Str(required=True)
    numero_registro = fields.Str(required=True)
    fabricante = fields.Str(required=True)
    tipo = fields.Str(required=True)
    descricao = fields.Str(required=True)


class MercadoriaUpdateSchema(Schema):
    nome = fields.Str()
    numero_registro = fields.Str()
    fabricante = fields.Str()
    tipo = fields.Str()
    descricao = fields.Str()