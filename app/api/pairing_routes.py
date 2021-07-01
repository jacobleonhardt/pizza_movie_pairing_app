from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Pairing
import requests
import random

pairing_routes = Blueprint('new', __name__)

@pairing_routes.route('/pair/<int:userId>/dominos')
@login_required
def pairing(userId):
    req = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=d4b83eae239cd5168bcdc521eeea13b6&include_adult=false&language=en-US&certification=PG-13&with_genres=28")
    response = req.json();
    results = response["results"];
    prev = Pairing.query.filter(Pairing.user_id == userId).all()
    possible_selections = []

    for movie in results:
        if movie["title"] not in prev:
            possible_selections.append(movie)

    movie = random.choice(possible_selections);

    pairing = Pairing(
        user_id=userId,
        pizza="Domino's Pizza",
        title=movie["title"],
        release_date=movie["release_date"],
        genre=movie["genre_ids"],
        plot=movie["overview"],
        poster=movie["poster_path"]
    )

    db.session.add(pairing)
    db.session.commit()

    return pairing.to_dict()