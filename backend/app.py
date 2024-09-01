from flask import Flask
from flask_cors import CORS
from flask_smorest import Api
from config import conexao
from utils import db

import models

from resources.operacao import blp as OperacaoBlueprint
from resources.mercadoria import blp as MercadoriaBlueprint


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["API_TITLE"] = "Morning Star REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = conexao
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)
    api = Api(app)

    with app.app_context():
        db.create_all()

    api.register_blueprint(OperacaoBlueprint)
    api.register_blueprint(MercadoriaBlueprint)

    return app
