#!/usr/bin/env python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Initializing Flask app
app = Flask(__name__)
app.app_context().push()

# Configuration
USER = "cerda086"
PASSWORD = "Pozuelo1"  
PUBLIC_IP_ADDRESS = "34.45.23.119"
DBNAME = "hatttrickdb"

LOCAL_DB_PATH = f"postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING", LOCAL_DB_PATH)
db = SQLAlchemy(app)

# Leagues Model
class League(db.Model):
    __tablename__ = 'leagues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

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

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'league_id': self.league_id,
            'address': self.address,
            'crest': self.crest,
            'website': self.website,
            'venue': self.venue,
            'founded': self.founded,
            'coach': self.coach,
            'area': self.area
        }

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

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'number': self.number,
            'position': self.position,
            'photo': self.photo,
            'club': self.club
        }

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

    def serialize(self):
        return {
            'team_id': self.team_id,
            'league_id': self.league_id,
            'position': self.position,
            'team_crest': self.team_crest,
            'points': self.points,
            'games_won': self.games_won,
            'games_lost': self.games_lost,
            'goals_for': self.goals_for,
            'goals_against': self.goals_against,
            'goal_difference': self.goal_difference
        }

db.create_all()
