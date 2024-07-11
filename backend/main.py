from flask import Flask, jsonify, render_template
from flask_cors import CORS
from backend.create_db import app, db, League, Team, Player, Standing

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

@app.route('/standings/<league_name>')
def get_standings(league_name):
    league = db.session.query(League).filter_by(name=league_name).first()
    if not league:
        return jsonify({"error": "League not found"}), 404

    standings = db.session.query(Standing).filter_by(league_id=league.id).all()
    return jsonify([standing.serialize() for standing in standings])

@app.route('/standings/<league_name>/<team_name>')
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
    app.run(debug=True)