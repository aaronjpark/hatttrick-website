import json
import psycopg2
import sqlalchemy

def populate_players():
    # Database connection parameters
    conn = psycopg2.connect(
        dbname='hatttrickdb',
        host='localhost'
    )
    cur = conn.cursor()

    with open('modelsInfo/combined_teams_players.json', 'r') as f:
        players = json.load(f)

    for player in players:
        name = player.get('name')
        age = player.get('age')
        number = player.get('number')
        position = player.get('position')
        photo = player.get('photo')
        club = player.get('club')

        # Check for null values in required fields
        if not all([name, age, number, position, club]):
            print(f"Skipping player due to missing data: {player}")
            continue

        # Debugging: Print club name
        print(f"Processing player: {name}, Club: {club}")

        cur.execute("""
            INSERT INTO players (name, age, number, position, photo, club)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (name) DO NOTHING;
        """, (name, age, number, position, photo, club))
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    populate_players()
