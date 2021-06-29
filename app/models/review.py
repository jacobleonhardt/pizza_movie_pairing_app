from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pairing_id = db.Column(db.Integer, db.ForeignKey('pairings.id'))
    good = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="review")
    pair = db.relationship("Pairing")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pairing_uid": self.pairing_id,
            "good": self.good
        }
