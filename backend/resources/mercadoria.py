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

        try:
            mercadoria.delete_from_db()
        except IntegrityError:
                abort(
                400, 
                message="Erro, essa mercadoria está vinculada a uma operação."
            )
        except SQLAlchemyError:
            return {"msg": "Ocorreu um erro ao deletar a mercadoria."}, 500
        
        return {'message': 'Mercadoria deletada.'}

    @blp.arguments(MercadoriaUpdateSchema)
    @blp.response(200, MercadoriaSchema)
    def put(self, data, id):
        data = request.get_json()
        mercadoria = MercadoriaModel.query.get_or_404(id)
        
        try:
            mercadoria.update_to_db(**data)
        except IntegrityError:
                abort(
                400, 
                message="Uma mercadoria com esse nome ja existe."
            )
        except SQLAlchemyError:
            return {"msg": "Ocorreu um erro ao atualziar a mercadoria."}, 500
        
        return mercadoria


@blp.route("/mercadoria")
class MercadoriaList(MethodView):
    @blp.response(200, MercadoriaSchema(many=True))
    def get(self):
        return MercadoriaModel.query.order_by("id")
    
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
