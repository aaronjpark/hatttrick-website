#!/usr/bin/env python3

import json
from models import app, db, League, Team, Player, Standing

def load_json(filename):
    try:
        with open(filename) as file:
            data = json.load(file)
        return data
    except Exception as e:
        print(f"Error loading {filename}: {e}")
        return {}

def populate_leagues():
    leagues = load_json('backend/modelsInfo/leagues.json')
    for league_name, league_info in leagues.items():
        try:
            league_id = league_info['id']
            league = League(id=league_id, name=league_name)
            db.session.add(league)
        except Exception as e:
            print(f"Error adding league {league_name}: {e}")
    db.session.commit()

def populate_teams():
    leagues = load_json('backend/modelsInfo/teams.json')
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['teams'].items():
            try:
                team_id = team_info['id']
                team = Team(
                    id=team_id, name=team_name, league_id=league_id,
                    address=team_info.get('address'), crest=team_info.get('crest'),
                    website=team_info.get('website'), venue=team_info.get('venue'),
                    founded=team_info.get('founded'), coach=team_info.get('coach'),
                    area=team_info.get('area')
                )
                db.session.add(team)
            except Exception as e:
                print(f"Error adding team {team_name} in league {league_name}: {e}")
    db.session.commit()

def populate_players():
    players = load_json('backend/modelsInfo/combined_teams_players.json')
    for player_info in players:
        try:
            player = Player(
                name=player_info.get('name'), age=player_info.get('age'),
                number=player_info.get('number'), position=player_info.get('position'),
                photo=player_info.get('photo'), club=player_info.get('club')
            )
            db.session.add(player)
        except Exception as e:
            print(f"Error adding player {player_info.get('name')}: {e}")
    db.session.commit()

def populate_standings():
    leagues = load_json('backend/modelsInfo/leagues.json')
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['standings'].items():
            try:
                team_id = team_info['id']
                standing = Standing(
                    team_id=team_id, league_id=league_id, position=team_info.get('position'),
                    team_crest=team_info.get('team_crest'), points=team_info.get('points'),
                    games_won=team_info.get('games_won'), games_lost=team_info.get('games_lost'),
                    goals_for=team_info.get('goals_for'), goals_against=team_info.get('goals_against'),
                    goal_difference=team_info.get('goal_difference')
                )
                db.session.add(standing)
            except Exception as e:
                print(f"Error adding standing for team {team_name} in league {league_name}: {e}")
    db.session.commit()

# Use the app context explicitly to address the warning
with app.app_context():
    db.drop_all()
    db.create_all()
    populate_leagues()
    populate_teams()
    populate_players()
    populate_standings()
