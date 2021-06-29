import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  TMDB_API=os.environ.get('TMDB_API')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
