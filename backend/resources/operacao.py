from flask import request
from flask.views import MethodView
from utils import db
from flask_smorest import abort, Blueprint
from models import OperacaoModel, OperacaoSchema, MercadoriaModel, EntradasSaidasMesSchema, OperacoesTotaisSchema

from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy import func, extract, case


blp = Blueprint("operacao", __name__, description="Operacoes de entrada e saida.")


@blp.route("/operacao/<int:id>")
class Operacao(MethodView):
    @blp.response(200, OperacaoSchema)
    def get(self, id):
        operacao = OperacaoModel.query.get_or_404(id)
        return operacao


@blp.route("/operacao")
class OperacaoList(MethodView):
    @blp.response(200, OperacaoSchema(many=True))
    def get(self):
        return OperacaoModel.query.order_by("data_hora")
    
    @blp.arguments(OperacaoSchema)
    @blp.response(201, OperacaoSchema)
    def post(self, data):
        operacao = OperacaoModel(**data)
        id_mercadoria = data.get("mercadoria_id", None)
        mercadoria = MercadoriaModel.query.get(id_mercadoria)
    
        if not mercadoria:
            abort(400, message=f"Mercadoria com o id {id_mercadoria} nao existe.")

        if operacao.tipo_operacao == "saida":
            if operacao.quantidade > mercadoria.quantidade:
                abort(400, message=f"Quantidade indisponivel, tem apenas {mercadoria.quantidade}")
        try:
            operacao.save_to_db(mercadoria)
        except SQLAlchemyError:
            return {"msg": "Ocorreu um erro ao salvar a operacao."}, 500

        return operacao, 201


@blp.route("/operacao/mes/<int:id>")
class OperacoesPorMes(MethodView):
    @blp.response(200, EntradasSaidasMesSchema(many=True))
    def get(self, id):
        dados = OperacaoModel.get_opercao_mes(OperacaoModel, id=id)
        return dados, 200


@blp.route("/operacao/totais")
class OperacoesTotais(MethodView):
    @blp.response(200, EntradasSaidasMesSchema(many=True))
    def get(self):
        dados = OperacaoModel.operacoes_totais(OperacaoModel)
        return dados, 200
