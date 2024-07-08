from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Function to load data from JSON file
def load_players():
    with open('../combined_teams_players.json', 'r') as file:
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

if __name__ == '__main__':
    app.run(debug=True)
