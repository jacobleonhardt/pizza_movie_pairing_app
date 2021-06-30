from flask import Blueprints, jsonify
from flask_login import login_required
from app.models import Pairing

pairing_routes = Blueprints('pairs', __name__)

@pairing_routes.route('/')
@login_required
def pairing():
    
