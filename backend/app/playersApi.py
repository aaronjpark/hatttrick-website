from flask import Flask, jsonify, abort
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

@app.route('/players', methods=['GET'])
def get_players():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM players;')
    players = cur.fetchall()
    cur.close()
    conn.close()

    players_data = [
        {
            'id': player[0],
            'name': player[1],
            'age': player[2],
            'number': player[3],
            'position': player[4],
            'club': player[5],
            'photo': player[6]
        }
        for player in players
    ]

    return jsonify(players_data)

@app.route('/players/<string:name>', methods=['GET'])
def get_player_by_name(name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM players WHERE name ILIKE %s;', (f'%{name}%',))
    player = cur.fetchone()
    cur.close()
    conn.close()

    if player:
        player_data = {
            'id': player[0],
            'name': player[1],
            'age': player[2],
            'number': player[3],
            'position': player[4],
            'club': player[5],
            'photo': player[6]
        }
        return jsonify(player_data)
    else:
        abort(404, description="Player not found")

if __name__ == '__main__':
    app.run(debug=True)
