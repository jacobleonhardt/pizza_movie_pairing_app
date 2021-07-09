import os
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Pairing, Review
import requests
import random

pairing_routes = Blueprint('pair', __name__)

API = os.environ.get('TMDB_API')

@pairing_routes.route('/<int:userId>')
@login_required
def getPrePairings(userId):
    prev = Pairing.query.filter(Pairing.user_id == userId).order_by(Pairing.created_at.desc()).all()
    prev_list = [movie.to_dict() for movie in prev]

    return jsonify(prev_list)


@pairing_routes.route('/delete/<int:pairId>', methods=["DELETE"])
@login_required
def deletePair(pairId):
    info = request.get_json()
    pair = Pairing.query.filter(Pairing.id == pairId).first()
    review = Review.query.filter(Review.pairing_id == pairId).first()

    if review:
        db.session.delete(review)

    db.session.delete(pair)
    db.session.commit()

    prev = Pairing.query.filter(Pairing.user_id == info["userId"]).order_by(Pairing.created_at.desc()).all()
    prev_list = [movie.to_dict() for movie in prev]
    return jsonify(prev_list)

@pairing_routes.route('/delete/404s', methods=["DELETE"])
@login_required
def delete404s():
    info = request.get_json()
    notFound = Pairing.query.filter(Pairing.pizza == '404').first()

    db.session.delete(notFound)
    db.session.commit()

    return


@pairing_routes.route('/new/<int:userId>/<pizzaPlace>')
@login_required
def pairing(userId, pizzaPlace):
    if pizzaPlace == 'dominos':
        pizza_selection = "Domino's Pizza"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&original_language=en&release_date.gte=01011980&certification_country=US&certification.lte=PG-13&with_genres=12")

    if pizzaPlace == 'donatos':
        pizza_selection = "Donatos Pizza"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&original_language=en&release_date.gte=01011940&certification_country=US&certification.lte=PG-13&vote_average.gte=7&with_genres=18&without_genres=10749,16,28,10770")

    if pizzaPlace == 'giordanos':
        pizza_selection = "Giordano's"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&original_language=en&release_date.lte=12311999&certification_country=US&certification.lte=R&vote_average.gte=7&without_genres=10749,16,99,27,10770,10751")

    if pizzaPlace == 'little-caesars':
        pizza_selection = "Little Caesars Pizza"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&language=en&release_date.gte=01011950&certification_country=US&certification=PG&without_genres=99")

    if pizzaPlace == 'mellow-mushroom':
        pizza_selection = "Mellow Mushroom"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&release_date.gte=01011980&certification_country=US&certification=PG-13&vote_average.gte=6&with_genres=14")

    if pizzaPlace == 'papa-johns':
        pizza_selection = "Papa John's Pizza"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&language=en&release_date.gte=01011935&certification_country=US&certification.lte=R&with_genres=10752|37|36&without_genres=10749,16,878,10770")

    if pizzaPlace == 'pizza-hut':
        pizza_selection = "Pizza Hut"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&original_language=en&release_date.gte=01011980&certification_country=US&certification=PG-13&vote_average.gte=6.5&with_genres=28|878|53")


    response = req.json();
    results = response["results"];
    prev = Pairing.query.filter(Pairing.user_id == userId).all()
    prev_selections = []

    for pair in prev:
            prev_selections.append(pair.title)

    possible_selections = []

    for movie in results:
        if movie["title"] not in prev_selections:
            possible_selections.append(movie)

    movie = random.choice(possible_selections);

    pairing = Pairing(
        user_id=userId,
        pizza=pizza_selection,
        title=movie["title"],
        release_date=movie["release_date"],
        genre=movie["genre_ids"],
        plot=movie["overview"],
        poster=movie["poster_path"],
        backdrop_path=movie["backdrop_path"]
    )

    db.session.add(pairing)
    db.session.commit()

    return pairing.to_dict()


@pairing_routes.route('/new/<int:userId>/<movieTitle>/<int:movieYear>')
@login_required
def reversePairing(userId, movieTitle, movieYear):
    split_title = movieTitle.split()
    query_string = "+".join(split_title)
    query_string.lower()
    req = requests.get(f"https://api.themoviedb.org/3/search/movie?api_key={API}&query={query_string}&year={movieYear}")


    response = req.json();
    results = response["results"];
    if len(results) > 0:
        chosen_movie = results[0]
        print('#############################', chosen_movie)
        pizza_selection = ''

        for genre in chosen_movie["genre_ids"]:
            if genre == 12:
                pizza_selection = "Domino's Pizza"
            elif genre == 14:
                pizza_selection = "Mellow Mushroom"
            elif genre == 18:
                pizza_selection = "Donatos Pizza"
            elif genre == 28:
                pizza_selection = "Pizza Hut"
            elif genre == 36:
                pizza_selection = "Papa John's Pizza"
            elif genre == 37:
                pizza_selection = "Papa John's Pizza"
            elif genre == 53:
                pizza_selection = "Pizza Hut"
            elif genre == 878:
                pizza_selection = "Pizza Hut"
            elif genre == 10752:
                pizza_selection = "Papa John's Pizza"
            else:
                pizza_selection = "Little Caesars Pizza"
    else:
        return({'error': "whoops!"})

    pairing = Pairing(
        user_id=userId,
        pizza=pizza_selection,
        title=chosen_movie["title"],
        release_date=chosen_movie["release_date"],
        genre=chosen_movie["genre_ids"],
        plot=chosen_movie["overview"],
        poster=chosen_movie["poster_path"],
        backdrop_path=chosen_movie["backdrop_path"]
    )

    db.session.add(pairing)
    db.session.commit()

    return pairing.to_dict()
