#!/usr/bin/env python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Initializing SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    # USER = "postgress"
    # PASSWORD = "pozuelo1"
    # PUBLIC_IP_ADDRESS = "34.45.23.119"
    # DBNAME = "hatttrickdb"

    # LOCAL_DB_PATH = f"postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}"
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING", LOCAL_DB_PATH)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://cerda086:1234@localhost/hattrickdb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Create database tables within the application context
    with app.app_context():
        db.create_all()

    return app

# Initialize the app
app = create_app()

# Leagues Model
class League(db.Model):
    __tablename__ = 'leagues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

# Teams Model
class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    address = db.Column(db.String(200))
    crest = db.Column(db.String(200))
    website = db.Column(db.String(200))
    venue = db.Column(db.String(200))
    founded = db.Column(db.Integer)
    coach = db.Column(db.String(80))
    area = db.Column(db.String(80))

# Players Model
class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer)
    number = db.Column(db.Integer)
    position = db.Column(db.String(80))
    photo = db.Column(db.String(200))
    club = db.Column(db.String(80))

# Standings Model
class Standing(db.Model):
    __tablename__ = 'standings'
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), primary_key=True)
    position = db.Column(db.Integer)
    team_crest = db.Column(db.String(200))
    points = db.Column(db.Integer)
    games_won = db.Column(db.Integer)
    games_lost = db.Column(db.Integer)
    goals_for = db.Column(db.Integer)
    goals_against = db.Column(db.Integer)
    goal_difference = db.Column(db.Integer)
    team_name = db.Column(db.String(80))  # Added team_name field


# Now you can run any additional setup or script you need
if __name__ == "__main__":
    app.run(debug=True)
