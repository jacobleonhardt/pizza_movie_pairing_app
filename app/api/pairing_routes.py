from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Pairing

pairing_routes = Blueprint('pairs', __name__)

@pairing_routes.route('/')
@login_required
def pairing():
    return;
