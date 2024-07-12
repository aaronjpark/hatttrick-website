from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.json.sort_keys = False

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname='hatttrick_db',
        host='localhost',
        port='5432'
    )
    return conn

@app.route('/')
def index():
    return "Football Standings API"

@app.route('/standings/<int:league_id>')
def get_standings(league_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM standings WHERE league_id = %s;', (league_id,))
    standings = cur.fetchall()
    cur.close()
    conn.close()

    if standings:
        standings_data = [
            {
                'team_id': standing[0],
                'league_id': standing[1],
                'position': standing[2],
                'team_crest': standing[3],
                'points': standing[4],
                'games_won': standing[5],
                'games_lost': standing[6],
                'goals_for': standing[7],
                'goals_against': standing[8],
                'goal_difference': standing[9]
            }
            for standing in standings
        ]
        return jsonify(standings_data)
    else:
        return jsonify({"error": f"League with ID '{league_id}' not found."}), 404

@app.route('/standings/<int:league_id>/<int:team_id>')
def get_team_details(league_id, team_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM standings WHERE league_id = %s AND team_id = %s;', (league_id, team_id))
    team_details = cur.fetchone()
    cur.close()
    conn.close()

    if team_details:
        team_data = {
            'team_id': team_details[0],
            'league_id': team_details[1],
            'position': team_details[2],
            'team_crest': team_details[3],
            'points': team_details[4],
            'games_won': team_details[5],
            'games_lost': team_details[6],
            'goals_for': team_details[7],
            'goals_against': team_details[8],
            'goal_difference': team_details[9]
        }
        return jsonify(team_data)
    else:
        return jsonify({"error": f"Team with ID '{team_id}' not found in League with ID '{league_id}'."}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5002)