import json
import psycopg2

# Database connection parameters
conn = psycopg2.connect(
    dbname='hatttrick_db',
    user='postgres',
    host='localhost'
)
cur = conn.cursor()

# Load leagues and standings data from leagues.json
with open('modelsInfo/leagues.json') as f:
    leagues_data = json.load(f)

# Insert leagues, teams, and standings from leagues.json
for league_name, league_info in leagues_data.items():
    cur.execute("INSERT INTO leagues (id, name) VALUES (%s, %s) ON CONFLICT (id) DO NOTHING", (league_info['id'], league_name))
    league_id = league_info['id']

    for team_name, team_info in league_info['standings'].items():
        cur.execute(
            """
            INSERT INTO teams (
                id, name, league_id
            ) VALUES (%s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                team_info['id'], team_name.strip(), league_id
            )
        )

        cur.execute(
            """
            INSERT INTO standings (
                league_id, team_id, position, points, games_won, games_lost, goals_for, goals_against, goal_difference, team_crest
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (league_id, team_id) DO NOTHING
            """,
            (
                league_id, team_info['id'], team_info['position'], team_info['points'],
                team_info['games_won'], team_info['games_lost'], team_info['goals_for'],
                team_info['goals_against'], team_info['goal_difference'], team_info['team_crest']
            )
        )
        print(f"Inserted team: {team_name.strip()}")

# Load additional team details from teams.json
with open('modelsInfo/teams.json') as f:
    teams_data = json.load(f)

# Insert teams from teams.json
for league_name, league_info in teams_data.items():
    league_id = league_info['id']

    for team_name, team_info in league_info['teams'].items():
        cur.execute(
            """
            INSERT INTO teams (
                id, name, league_id, address, crest, website, venue, founded, coach, area
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                team_info['id'], team_name.strip(), league_id, team_info['address'], team_info['crest'],
                team_info['website'], team_info['venue'], team_info['founded'],
                team_info['coach'], team_info['area']
            )
        )
        print(f"Inserted team: {team_name.strip()}")

# Debug: Print all teams in the database
cur.execute("SELECT id, name FROM teams")
teams_in_db = cur.fetchall()
print("Teams in the database:", teams_in_db)

# Load players data from combined_teams_players.json
with open('modelsInfo/combined_teams_players.json') as f:
    players_data = json.load(f)

# Insert players
for player in players_data:
    club_name = player['club'].strip()
    # Debug: Check if club exists in the teams table
    cur.execute("SELECT id FROM teams WHERE name = %s", (club_name,))
    team = cur.fetchone()
    if team:
        cur.execute(
            """
            INSERT INTO players (
                name, age, number, position, photo, club
            ) VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                player['name'], player['age'], player['number'], player['position'],
                player['photo'], club_name
            )
        )
        print(f"Inserted player: {player['name']} in club: {club_name}")
    else:
        print(f"Club {club_name} not found in teams table")

conn.commit()
cur.close()
conn.close()
