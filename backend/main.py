from flask import Flask, jsonify, render_template
from flask_cors import CORS
from create_db import app, db, League, Team, Player, Standing

CORS(app)
app.json.sort_keys = False

@app.route('/')
def index():
        return jsonify({"message":"hello"})

@app.route('/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    teams_list = [{"id": team.id, "name": team.name, "league_id": team.league_id, "address": team.address,
                   "crest": team.crest, "website": team.website, "venue": team.venue, "founded": team.founded,
                   "coach": team.coach, "area": team.area} for team in teams]
    return jsonify(teams_list)

@app.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    players_list = [{"id": player.id, "name": player.name, "age": player.age, "number": player.number,
                     "position": player.position, "photo": player.photo, "club": player.club} for player in players]
    return jsonify(players_list)


@app.route('/leagues/<string:league_name>', methods=['GET'])
def get_teams_by_league(league_name):
    league = League.query.filter_by(name=league_name).first()
    if league:
        teams = Team.query.filter_by(league_id=league.id).all()
        teams_list = [{"id": team.id, "name": team.name, "league_id": team.league_id, "address": team.address,
                       "crest": team.crest, "website": team.website, "venue": team.venue, "founded": team.founded,
                       "coach": team.coach, "area": team.area} for team in teams]
        return jsonify(teams_list)
    return jsonify({"message": "League not found"}), 404

@app.route('/league/<int:league_id>', methods=['GET'])
def get_league_name_by_id(league_id):
    league = League.query.filter_by(id=league_id).first()
    if league:
        return jsonify({ "name": league.name})
    return jsonify({"message": "League not found"}), 404


@app.route('/players/<string:name>', methods=['GET'])
def get_player_by_name(name):
    player = Player.query.filter_by(name=name).first()
    if player:
        player_info = {"id": player.id, "name": player.name, "age": player.age, "number": player.number,
                       "position": player.position, "photo": player.photo, "club": player.club}
        return jsonify(player_info)
    return jsonify({"message": "Player not found"}), 404

@app.route('/players/team/<string:team_name>', methods=['GET'])
def get_players_by_team(team_name):
    team = Team.query.filter_by(name=team_name).first()
    if team:
        players = Player.query.filter_by(club=team_name).all()
        players_list = [{"id": player.id, "name": player.name, "age": player.age, "number": player.number,
                         "position": player.position, "photo": player.photo, "club": player.club} for player in players]
        return jsonify(players_list)
    return jsonify({"message": "Team not found"}), 404

@app.route('/teammates/<string:player_name>', methods=['GET'])
def get_teammates(player_name):
    player = Player.query.filter_by(name=player_name).first()
    if player:
        teammates = Player.query.filter_by(club=player.club).filter(Player.name != player_name).all()
        teammates_list = [{"id": teammate.id, "name": teammate.name, "age": teammate.age, "number": teammate.number,
                           "position": teammate.position, "photo": teammate.photo, "club": teammate.club} for teammate in teammates]
        return jsonify(teammates_list)
    return jsonify({"message": "Player not found"}), 404

@app.route('/standings/<string:league_name>', methods=['GET'])
def get_standings_by_league_name(league_name):
    # Find the league by name
    league = League.query.filter_by(name=league_name).first()
    
    if not league:
        return jsonify({"error": "League not found"}), 404

    # Get the standings for the league
    standings = Standing.query.join(Team, Standing.team_id == Team.id).filter(Standing.league_id == league.id).all()
    standings_list = [{
        "team_id": standing.team_id,
        "league_id": standing.league_id,
        "position": standing.position,
        "team_crest": standing.team_crest,
        "points": standing.points,
        "games_won": standing.games_won,
        "games_lost": standing.games_lost,
        "goals_for": standing.goals_for,
        "goals_against": standing.goals_against,
        "goal_difference": standing.goal_difference,
        "team_name": standing.team_name  # Include team name
    } for standing in standings]
    return jsonify(standings_list)

@app.route('/club/<string:team_name>', methods=['GET'])
def get_team_info(team_name):
    team = Team.query.filter_by(name=team_name).first()
    if team:
        team_info = {"id": team.id, "name": team.name, "league_id": team.league_id, "address": team.address,
                     "crest": team.crest, "website": team.website, "venue": team.venue, "founded": team.founded,
                     "coach": team.coach, "area": team.area}
        return jsonify(team_info)
    return jsonify({"message": "Team not found"}), 404

@app.route('/league_name/<int:league_id>', methods=['GET'])
def get_league_name(league_id):
    league = League.query.get(league_id)
    if league:
        return jsonify({"league_name": league.name})
    else:
        return jsonify({"error": "League not found"}), 404