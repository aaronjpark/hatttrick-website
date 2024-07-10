from flask import Flask, jsonify, abort
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Function to load data from JSON file
def load_players():
    with open('../modelsInfo/combined_teams_players.json', 'r') as file:
        return json.load(file)

@app.route('/players', methods=['GET'])
def get_players():
    players = load_players()
    return jsonify(players)

@app.route('/players/<string:name>', methods=['GET'])
def get_player_by_name(name):
    players = load_players()
    # Find player by name (case-insensitive)
    player = next((player for player in players if player['name'].lower() == name.lower()), None)
    if player is not None:
        return jsonify(player)
    else:
        abort(404, description="Player not found")

@app.route('/team/<string:team_name>', methods=['GET'])
def get_players_by_team(team_name):
    players = load_players()
    # Filter players by team (case-insensitive)
    team_players = [player for player in players if player['club'].lower() == team_name.lower()]
    if team_players:
        return jsonify(team_players)
    else:
        abort(404, description="No players found for this team")

@app.route('/teammates/<string:player_name>', methods=['GET'])
def get_teammates(player_name):
    players = load_players()
    # Find the player and their team
    player = next((p for p in players if p['name'].lower() == player_name.lower()), None)
    if not player:
        abort(404, description="Player not found")
    
    # Get all players from the same team
    team_name = player['club'].lower()
    teammates = [p for p in players if p['club'].lower() == team_name and p['name'].lower() != player_name.lower()]
    return jsonify(teammates)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
