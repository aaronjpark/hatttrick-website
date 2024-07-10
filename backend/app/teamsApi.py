from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname='hatttrick_db',
        host='localhost',
        port='5432'
    )
    return conn

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
@app.route('/teams/<int:league_id>', methods=['GET'])
def get_teams_by_league(league_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM teams WHERE league_id = %s;', (league_id,))
    teams = cur.fetchall()
    cur.close()
    conn.close()

    if teams:
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
    else:
        return jsonify({"error": f"League with ID '{league_id}' not found."}), 404

if __name__ == '__main__':
    app.run(debug=True)
