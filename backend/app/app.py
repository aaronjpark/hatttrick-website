from flask import Flask, jsonify, abort
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app, origins=['http://34.45.23.119:hattrick-428116:us-central1:hatttrickdb'])

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host="34.45.23.119",
        database="hatttrickdb"
    )
    return conn

# Teams endpoints
@app.route('/teams', methods=['GET'])
def get_all_teams():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM teams')
    teams = cur.fetchall()
    cur.close()
    conn.close()

    teams_data = {}
    for team in teams:
        league_id, team_id, name, address, crest, website, venue, founded, coach, area = team
        if league_id not in teams_data:
            teams_data[league_id] = {'teams': {}}
        teams_data[league_id]['teams'][team_id] = {
            'id': team_id,            
            'address': address,
            'crest': crest,
            'website': website,
            'venue': venue,
            'founded': founded,
            'coach': coach,
            'area': area
        }

    return jsonify(teams_data)

@app.route('/teams/<string:league_name>', methods=['GET'])
def get_teams_by_league(league_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM teams WHERE league_id = (SELECT id FROM leagues WHERE name = %s)', (league_name,))
    teams = cur.fetchall()
    cur.close()
    conn.close()

    if not teams:
        return jsonify({"error": f"League '{league_name}' not found."}), 404

    league_data = {'teams': {}}
    for team in teams:
        league_id, team_id, name, address, crest, website, venue, founded, coach, area = team
        league_data['teams'][name] = {
            'id': team_id,
            'address': address,
            'crest': crest,
            'website': website,
            'venue': venue,
            'founded': founded,
            'coach': coach,
            'area': area
        }

    return jsonify({league_name: league_data})

# Leagues and standings endpoints
@app.route('/standings/<league_name>')
def get_standings(league_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM standings WHERE league_id = (SELECT id FROM leagues WHERE name = %s)', (league_name,))
    standings = cur.fetchall()
    cur.close()
    conn.close()

    if not standings:
        return jsonify({"error": "League not found"}), 404

    standings_data = {}
    for standing in standings:
        id, league_id, team_id, position, points, games_won, games_lost, goals_for, goals_against, goal_difference = standing
        standings_data[team_id] = {
            'id': team_id,
            'position': position,
            'points': points,
            'games_won': games_won,
            'games_lost': games_lost,
            'goals_for': goals_for,
            'goals_against': goals_against,
            'goal_difference': goal_difference
        }

    return jsonify(standings_data)

@app.route('/standings/<league_name>/<team_name>')
def get_team_details(league_name, team_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        SELECT s.* FROM standings s
        JOIN teams t ON s.team_id = t.id
        JOIN leagues l ON s.league_id = l.id
        WHERE l.name = %s AND t.name = %s
    ''', (league_name, team_name))
    team_details = cur.fetchone()
    cur.close()
    conn.close()

    if not team_details:
        return jsonify({"error": "Team not found"}), 404

    id, league_id, team_id, position, points, games_won, games_lost, goals_for, goals_against, goal_difference = team_details
    team_data = {
        'id': team_id,
        'position': position,
        'points': points,
        'games_won': games_won,
        'games_lost': games_lost,
        'goals_for': goals_for,
        'goals_against': goals_against,
        'goal_difference': goal_difference
    }

    return jsonify(team_data)

# Players endpoints
@app.route('/players', methods=['GET'])
def get_players():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM players')
    players = cur.fetchall()
    cur.close()
    conn.close()

    players_data = []
    for player in players:
        id, name, age, number, position, club, photo = player
        players_data.append({
            'id': id,
            'name': name,
            'age': age,
            'number': number,
            'position': position,
            'club': photo,
            'photo': club
        })

    return jsonify(players_data)

@app.route('/players/<string:name>', methods=['GET'])
def get_player_by_name(name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM players WHERE LOWER(name) = LOWER(%s)', (name,))
    player = cur.fetchone()
    cur.close()
    conn.close()

    if not player:
        return jsonify({"error": "Player not found"}), 404

    id, name, age, number, position, club, photo = player
    player_data = {
        'id': id,
        'age': age,
        'club': club(name),
        'name': name,
        'number': number,
        'photo': photo,
        'position': position
    }

    return jsonify(player_data)

if __name__ == '__main__':
    app.run(debug=True)
