from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Pairing
import requests

pairing_routes = Blueprint('new', __name__)

@pairing_routes.route('/pair/dominos')
@login_required
def pairing():
    req = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=d4b83eae239cd5168bcdc521eeea13b6&include_adult=false&language=en-US&certification=PG-13&with_genres=28")
    res = req.json();
    print('############', res)
    movie = Pairing()
    return
