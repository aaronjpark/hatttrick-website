import json
import psycopg2

def populate_leagues():
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
        
        cur.execute("""
            INSERT INTO leagues (id, name)
            VALUES (%s, %s)
            ON CONFLICT (id) DO NOTHING;
        """, (league_id, league_name))
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    populate_leagues()
