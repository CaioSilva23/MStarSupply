from sqlalchemy import Enum
from utils import db
from marshmallow import Schema, fields, validate, validates, ValidationError
from datetime import datetime
from models import MercadoriaModel
from sqlalchemy import func, extract, case

class OperacaoModel(db.Model):
    __tablename__ = 'operacao'
    
    id = db.Column(db.Integer, primary_key=True)
    tipo_operacao = db.Column(
        Enum('entrada', 'saida', name='tipo_operacao_enum'),
        nullable=False
    )
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    local = db.Column(db.String(100), nullable=False)
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadoria.id'), unique=False, nullable=False)

    mercadoria = db.relationship('MercadoriaModel', backref='operacoes')

    def __init__(self, tipo_operacao, quantidade, data_hora, local, mercadoria_id):
        self.tipo_operacao = tipo_operacao
        self.quantidade = quantidade
        self.data_hora = data_hora
        self.local = local
        self.mercadoria_id = mercadoria_id

    def save_to_db(self, mercadoria):
        try:
            if self.tipo_operacao == "entrada":
                mercadoria.quantidade += self.quantidade
            else:
                mercadoria.quantidade -= self.quantidade

            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def get_opercao_mes(self, id):
        dados = db.session.query(
            func.to_char(self.data_hora, 'MM').label('mes'),
            MercadoriaModel.nome.label('mercadoria'),
            func.sum(case((self.tipo_operacao == 'entrada', self.quantidade), else_=0)
            ).label('entrada'),
            func.sum(case((self.tipo_operacao == 'saida', self.quantidade),else_=0)
            ).label('saida')
        ).join(
            MercadoriaModel, self.mercadoria_id == MercadoriaModel.id
        ).filter(
            self.mercadoria_id == id,
        ).group_by(
            func.to_char(self.data_hora, 'MM'),
            MercadoriaModel.nome
        ).order_by("mes").all()

        return dados

    def operacoes_totais(self):
        dados = db.session.query(
            MercadoriaModel.nome.label('mercadoria'),
            func.sum(case(
                (self.tipo_operacao == 'entrada', self.quantidade),
                else_=0
            )).label('entrada'),
            func.sum(case(
                (self.tipo_operacao == 'saida', self.quantidade),
                else_=0
            )).label('saida')
        ).join(
            MercadoriaModel, self.mercadoria_id == MercadoriaModel.id
        ).group_by(
            MercadoriaModel.nome
        ).all()
        return dados


class OperacaoSchema(Schema):
    id = fields.Int(dump_only=True)
    tipo_operacao = fields.Str(
        required=True,
        validate=validate.OneOf(["entrada", "saida"])
    )
    quantidade = fields.Int(required=True)
    data_hora = fields.DateTime()
    local = fields.Str(required=True)
    mercadoria_id = fields.Int(required=True)
    mercadoria = fields.Str(attribute="mercadoria.nome")

class EntradasSaidasMesSchema(Schema):
    mes = fields.Str()
    mercadoria = fields.Str()
    entrada = fields.Int()
    saida = fields.Int()


class OperacoesTotaisSchema(Schema):
    entrada = fields.Int()
    saida = fields.Int()