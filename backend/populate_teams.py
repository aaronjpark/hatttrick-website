import json
import psycopg2

def populate_teams():
    # Database connection parameters
    conn = psycopg2.connect(
        dbname='hatttrick_db',
        user='postgres',
        host='localhost'
    )
    cur = conn.cursor()

    with open('modelsInfo/teams.json', 'r') as f:
        leagues = json.load(f)

    for league_name, league_info in leagues.items():
        league_id = league_info['id']
        for team_name, team_info in league_info['teams'].items():
            team_id = team_info['id']
            address = team_info['address']
            crest = team_info['crest']
            website = team_info['website']
            venue = team_info['venue']
            founded = team_info['founded']
            coach = team_info['coach']
            area = team_info['area']

            print(f"Inserting team: {team_name} with ID: {team_id}")

            cur.execute("""
                INSERT INTO teams (id, name, league_id, address, crest, website, venue, founded, coach, area)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            """, (team_id, team_name, league_id, address, crest, website, venue, founded, coach, area))
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    populate_teams()
