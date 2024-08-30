from flask import request
from flask.views import MethodView
import uuid
from utils import db
from flask_smorest import abort, Blueprint
from models import MercadoriaModel, MercadoriaSchema, MercadoriaUpdateSchema
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

blp = Blueprint("mercadoria", __name__, description="Operacoes com mercadoria")


@blp.route("/mercadoria/<int:id>")
class Mercadoria(MethodView):
    @blp.response(200, MercadoriaSchema)
    def get(self, id):
        mercadoria = MercadoriaModel.query.get_or_404(id)
        return mercadoria

    def delete(self, id):
        mercadoria = MercadoriaModel.query.get_or_404(id)        
        if mercadoria: 
            mercadoria.delete_from_db()
        
        return {'message': 'Mercadoria deletada.'}

    @blp.arguments(MercadoriaUpdateSchema)
    @blp.response(200, MercadoriaSchema)
    def put(self, data, id):
        data = request.get_json()

        mercadoria = MercadoriaModel.query.get_or_404(id)
        
        mercadoria.nome = data.get('nome', mercadoria.nome)
        mercadoria.numero_registro = data.get('numero_registro', mercadoria.numero_registro)
        mercadoria.fabricante = data.get('fabricante', mercadoria.fabricante)
        mercadoria.tipo = data.get('tipo', mercadoria.tipo)
        mercadoria.descricao = data.get('descricao', mercadoria.descricao)

        mercadoria.update_to_db()

        return mercadoria


@blp.route("/mercadoria")
class MercadoriaList(MethodView):
    @blp.response(200, MercadoriaSchema(many=True))
    def get(self):
        return MercadoriaModel.query.all()
    
    @blp.arguments(MercadoriaSchema)
    @blp.response(201, MercadoriaSchema)
    def post(self, mercadoria_data):
        mercadoria = MercadoriaModel(**mercadoria_data)
        try:
            mercadoria.save_to_db()
        except IntegrityError:
            abort(
                400, 
                message="Uma mercadoria com esse nome ja existe."
            )
        except SQLAlchemyError:
            return {"msg": "Ocorreu um erro ao salvar a mercadoria."}, 500

        return mercadoria, 201