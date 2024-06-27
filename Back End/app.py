from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__, template_folder='../Front End')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hattrick.db'
db = SQLAlchemy(app)

# Define models
class League(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    tier = db.Column(db.Integer, nullable=False)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    league_id = db.Column(db.Integer, db.ForeignKey('league.id'), nullable=False)
    stadium = db.Column(db.String(100), nullable=False)
    manager = db.Column(db.String(100), nullable=False)
    founded = db.Column(db.Integer, nullable=False)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    stats = db.Column(db.String(500), nullable=False)

# Create database tables
@app.before_first_request
def create_tables():
    db.create_all()

# Fetch data from API and provide endpoints
API_KEY = '8174f2a7ea1b41138e79173d7f0affa7'  
BASE_URL = 'https://api.football-data.org/v2/'

def fetch_from_api(endpoint):
    url = BASE_URL + endpoint
    headers = {'X-Auth-Token': API_KEY}
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/api/leagues', methods=['GET'])
def get_leagues():
    data = fetch_from_api('competitions')
    return jsonify(data)

@app.route('/api/teams', methods=['GET'])
def get_teams():
    data = fetch_from_api('teams')
    return jsonify(data)

@app.route('/api/players', methods=['GET'])
def get_players():
    data = fetch_from_api('players')
    return jsonify(data)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/leagues')
def leagues():
    return render_template('leagues.html')

@app.route('/clubs')
def clubs():
    return render_template('clubs.html')

@app.route('/players')
def players():
    return render_template('players.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
