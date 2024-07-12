from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Load team data from JSON file
with open('../teams.json', 'r') as f:
    teams_data = json.load(f)

# Endpoint to get all teams
@app.route('/teams', methods=['GET'])
def get_all_teams():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM teams;')
    teams = cur.fetchall()
    cur.close()
    conn.close()

    teams_data = [
        {
            'id': team[0],
            'name': team[1],
            'league_id': team[2],
            'address': team[3],
            'crest': team[4],
            'website': team[5],
            'venue': team[6],
            'founded': team[7],
            'coach': team[8],
            'area': team[9]
        }
        for team in teams
    ]

    return jsonify(teams_data)

# Endpoint to get teams by league
@app.route('/teams/<string:league_name>', methods=['GET'])
def get_teams_by_league(league_name):
    if league_name in teams_data:
        return jsonify({league_name: teams_data[league_name]})
    else:
        return jsonify({"error": f"League with ID '{league_id}' not found."}), 404

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
