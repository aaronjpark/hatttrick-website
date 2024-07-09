import json
import psycopg2

def populate_players():
    # Database connection parameters
    conn = psycopg2.connect(
        dbname='hatttrick_db',
        user='postgres',
        host='localhost'
    )
    cur = conn.cursor()

    with open('modelsInfo/combined_teams_players.json', 'r') as f:
        players = json.load(f)

    for player in players:
        name = player['name']
        age = player['age']
        number = player['number']
        position = player['position']
        photo = player['photo']
        club = player['club']

        # Debugging: Print club name
        print(f"Processing player: {name}, Club: {club}")

        # Check if the club exists in the teams table
        cur.execute("SELECT id FROM teams WHERE name = %s;", (club,))
        result = cur.fetchone()

        if result is None:
            print(f"Club {club} not found in teams table")
            continue
        else:
            club_id = result[0]

        cur.execute("""
            INSERT INTO players (name, age, number, position, photo, club)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (name) DO NOTHING;
        """, (name, age, number, position, photo, club_id))
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    populate_players()
