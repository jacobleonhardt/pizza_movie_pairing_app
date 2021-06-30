from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Pairing

pairing_routes = Blueprint('pairs', __name__)

@pairing_routes.route('/', methods=["POST"])
@login_required
def pairing(pizzaPlace):
    print('======HERE======')
    movie = get("https://api.themoviedb.org/3/discover/movie?api_key={TMDB_API}&include_adult=false&language=en-US&certification=PG-13&with_genres=28")
    print('############', movie)
    return movie.to_dict()
