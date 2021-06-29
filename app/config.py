import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  TMDb_API=os.environ.get('TMDb_API')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
