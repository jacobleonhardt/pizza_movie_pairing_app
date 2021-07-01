from .db import db

class Pairing(db.Model):
    __tablename__ = 'pairings'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pizza = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String)
    genre = db.Column(db.String)
    plot = db.Column(db.String)
    poster = db.Column(db.String)

    user = db.relationship("User", back_populates="pairing")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pizza": self.pizza,
            "title": self.title,
            "release_date": self.release_date,
            "genre": self.genre,
            "plot": self.plot
        }
