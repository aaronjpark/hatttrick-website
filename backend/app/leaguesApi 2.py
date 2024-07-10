from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.json.sort_keys = False


# Load data from JSON file
with open('../modelsInfo/leagues.json', 'r') as json_file:
    data = json.load(json_file)

# Define routes
@app.route('/')
def index():
    return "Football Standings API"

@app.route('/standings/<league_name>')
def get_standings(league_name):
    if league_name in data:
        return jsonify(data[league_name]['standings'])
    else:
        return jsonify({"error": "League not found"}), 404

@app.route('/standings/<league_name>/<team_name>')
def get_team_details(league_name, team_name):
    if league_name in data and team_name in data[league_name]['standings']:
        return jsonify(data[league_name]['standings'][team_name])
    else:
        return jsonify({"error": "Team not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5002)