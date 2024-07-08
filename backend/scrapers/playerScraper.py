import requests
import json

url = "https://v3.football.api-sports.io/players/squads"
headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "bf221ce7f3a4e65bbef6a9709dc06ca8"
}

# Load teams from JSON file
with open('all_teams.json', 'r') as file:
    teams = json.load(file)

all_players_data = []

for team in teams:
    team_id = team['id']
    team_name = team['name']
    
    params = {
        'team': team_id
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
        
        data = response.json()

        if 'response' in data and len(data['response']) > 0:
            # Extract player information
            players = data['response'][0]['players']
            for player in players:
                player_name = player['name']
                player_age = player['age']
                player_number = player['number']
                player_position = player['position']
                player_photo = player['photo']
                
                # Add club name under each player
                player['club'] = team_name
                
                # Collect player data
                all_players_data.append({
                    'name': player_name,
                    'age': player_age,
                    'number': player_number,
                    'position': player_position,
                    'photo': player_photo,
                    'club': team_name
                })
        else:
            print(f"No player data found for team {team_name} (ID: {team_id})")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for team {team_name} (ID: {team_id}):", e)

# Write all player data to a single JSON file
filename = "all_teams_players11.json"
with open(filename, 'w', encoding='utf-8') as f:
    json.dump(all_players_data, f, ensure_ascii=False, indent=4)

print(f"All player data saved to {filename}")
