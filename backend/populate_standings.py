import json
import psycopg2

def populate_standings():
    # Database connection parameters
    conn = psycopg2.connect(
        dbname='hatttrick_db',
        user='postgres',
        host='localhost'
    )
    cur = conn.cursor()

    with open('modelsInfo/leagues.json', 'r') as f:
        leagues = json.load(f)
    
    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['standings'].items():
            team_id = team_info['id']
            position = team_info['position']
            team_crest = team_info['team_crest']
            points = team_info['points']
            games_won = team_info['games_won']
            games_lost = team_info['games_lost']
            goals_for = team_info['goals_for']
            goals_against = team_info['goals_against']
            goal_difference = team_info['goal_difference']

            # Check if the team_id exists in the teams table
            cur.execute("SELECT id FROM teams WHERE id = %s", (team_id,))
            if cur.fetchone():
                cur.execute("""
                    INSERT INTO standings (team_id, league_id, position, team_crest, points, games_won, games_lost, goals_for, goals_against, goal_difference)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (team_id, league_id) DO NOTHING;
                """, (team_id, league_id, position, team_crest, points, games_won, games_lost, goals_for, goals_against, goal_difference))
            else:
                print(f"Team with id {team_id} not found in teams table")

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    populate_standings()
