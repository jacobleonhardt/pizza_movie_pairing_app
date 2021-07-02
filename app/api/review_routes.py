from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<vote>/<int:userId>/<int:pairId>')
@login_required
def newReview(vote, userId, pairId):
    print('######## HERE #########', vote)

    if vote == 'true':
        vote = True
    else:
        vote = False

    review = Review(
        user_id=userId,
        pairing_id=pairId,
        good=vote
    )

    db.session.add(review)
    db.session.commit()

    return review.to_dict()
