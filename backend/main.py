#!/usr/bin/env python3

import json
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from backend.models import app, db, League, Team, Player, Standing
import subprocess

# Load JSON data
def load_json(filename):
    with open(filename) as file:
        data = json.load(file)
    return data

# Populate database functions
def populate_leagues():
    leagues = load_json('backend/modelsInfo/leagues.json')
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        league = League(id=league_id, name=league_name)
        db.session.add(league)
    db.session.commit()

def populate_teams():
    leagues = load_json('backend/modelsInfo/teams.json')
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['teams'].items():
            team_id = team_info['id']
            team = Team(
                id=team_id, name=team_name, league_id=league_id,
                address=team_info.get('address'), crest=team_info.get('crest'),
                website=team_info.get('website'), venue=team_info.get('venue'),
                founded=team_info.get('founded'), coach=team_info.get('coach'),
                area=team_info.get('area')
            )
            db.session.add(team)
    db.session.commit()

def populate_players():
    players = load_json('backend/modelsInfo/combined_teams_players.json')
    for player_info in players:
        player = Player(
            name=player_info.get('name'), age=player_info.get('age'),
            number=player_info.get('number'), position=player_info.get('position'),
            photo=player_info.get('photo'), club=player_info.get('club')
        )
        db.session.add(player)
    db.session.commit()

def populate_standings():
    leagues = load_json('backend/modelsInfo/leagues.json')
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['standings'].items():
            team_id = team_info['id']
            standing = Standing(
                team_id=team_id, league_id=league_id, position=team_info.get('position'),
                team_crest=team_info.get('team_crest'), points=team_info.get('points'),
                games_won=team_info.get('games_won'), games_lost=team_info.get('games_lost'),
                goals_for=team_info.get('goals_for'), goals_against=team_info.get('goals_against'),
                goal_difference=team_info.get('goal_difference')
            )
            db.session.add(standing)
    db.session.commit()

# Initialize Flask app and CORS
CORS(app, origins=['http://34.45.23.119:hattrick-428116:us-central1:hatttrickdb'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/teams', methods=['GET'])
def get_all_teams():
    teams = db.session.query(Team).all()
    return jsonify([team.serialize() for team in teams])

@app.route('/teams/<string:league_name>', methods=['GET'])
def get_teams_by_league(league_name):
    league = db.session.query(League).filter_by(name=league_name).first()
    if not league:
        return jsonify({"error": f"League '{league_name}' not found."}), 404

    teams = db.session.query(Team).filter_by(league_id=league.id).all()
    return jsonify([team.serialize() for team in teams])

@app.route('/standings/<league_name>', methods=['GET'])
def get_standings(league_name):
    league = db.session.query(League).filter_by(name=league_name).first()
    if not league:
        return jsonify({"error": "League not found"}), 404

    standings = db.session.query(Standing).filter_by(league_id=league.id).all()
    return jsonify([standing.serialize() for standing in standings])

@app.route('/standings/<league_name>/<team_name>', methods=['GET'])
def get_team_details(league_name, team_name):
    league = db.session.query(League).filter_by(name=league_name).first()
    if not league:
        return jsonify({"error": "League not found"}), 404

    team = db.session.query(Team).filter_by(name=team_name).first()
    if not team:
        return jsonify({"error": "Team not found"}), 404

    standing = db.session.query(Standing).filter_by(team_id=team.id, league_id=league.id).first()
    if not standing:
        return jsonify({"error": "Standing not found"}), 404

    return jsonify(standing.serialize())

@app.route('/players', methods=['GET'])
def get_players():
    players = db.session.query(Player).all()
    return jsonify([player.serialize() for player in players])

@app.route('/players/<string:name>', methods=['GET'])
def get_player_by_name(name):
    player = db.session.query(Player).filter(Player.name.ilike(name)).first()
    if not player:
        return jsonify({"error": "Player not found"}), 404

    return jsonify(player.serialize())

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_leagues()
        populate_teams()
        populate_players()
        populate_standings()
    app.run(debug=True)
