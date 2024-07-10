from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Load team data from JSON file
with open('../modelsInfo/teams.json', 'r') as f:
    teams_data = json.load(f)

# Endpoint to get all teams
@app.route('/teams', methods=['GET'])
def get_all_teams():
    return jsonify(teams_data)

# Endpoint to get teams by league
@app.route('/leagues/<string:league_name>', methods=['GET'])
def get_teams_by_league(league_name):
    if league_name in teams_data:
        return jsonify({league_name: teams_data[league_name]})
    else:
        return jsonify({"error": f"League '{league_name}' not found."}), 404

# Endpoint to get team by team name
@app.route('/club/<string:team_name>', methods=['GET'])
def get_team_info(team_name):
    for league, league_info in teams_data.items():
        teams = league_info.get("teams", {})
        if team_name in teams:
            return jsonify({team_name: teams[team_name]})
    return jsonify({"error": f"Team '{team_name}' not found."}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5001)
