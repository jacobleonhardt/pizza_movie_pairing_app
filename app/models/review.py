from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pairing_id = db.Column(db.Integer, db.ForeignKey('pairings.id'))
    good = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="review")
    pair = db.relationship("Pairing")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pairing_id": self.pairing_id,
            "good": self.good,
            "created_at": self.created_at
        }
