from flask import Flask, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

# Database connectionls
def get_db_connection():
    conn = psycopg2.connect(
        dbname="hatttrick_db",
        host="localhost"
    )
    return conn

@app.route('/')
def index():
    return "Welcome to the Hatttrick API!"

@app.route('/players', methods=['GET'])
def get_players():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM players;')
    players = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(players)

@app.route('/teams', methods=['GET'])
def get_teams():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM teams;')
    teams = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(teams)

@app.route('/leagues', methods=['GET'])
def get_leagues():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM leagues;')
    leagues = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(leagues)

@app.route('/standings', methods=['GET'])
def get_standings():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM standings;')
    standings = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(standings)

if __name__ == '__main__':
    app.run(debug=True)
