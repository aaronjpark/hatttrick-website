import requests
import json

# Dictionary of football leagues
football_leagues = {
    "Premier League": "PL",
    "Ligue 1": "FL1",
    "Bundesliga": "BL1",
    "Serie A": "SA",
    "Eredivisie": "DED",
    "Primera Division": "PD"
}

# Base URL for the Football Data API
base_url = "http://api.football-data.org/v4/competitions/"

# Function to fetch standings data
def fetch_standings(league_code):
    # Construct the API URL
    api_url = f"{base_url}{league_code}/standings?season=2023"
    
    # Make the GET request to the API
    headers = {
        'X-Auth-Token': '8174f2a7ea1b41138e79173d7f0affa7'  # Replace with your actual API key
    }
    response = requests.get(api_url, headers=headers)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        standings_data = response.json()
        return standings_data
    else:
        print(f"Failed to fetch data for league {league_code}. Status code: {response.status_code}")
        return None

# Dictionary to store all standings data
all_standings = {}

# Loop through the dictionary and fetch standings data
for league_name, league_code in football_leagues.items():
    print(f"Fetching standings for {league_name}...")
    standings_data = fetch_standings(league_code)
    
    # Process standings data
    if standings_data:
        table_entries = standings_data['standings'][0]['table']
        league_standings = {}
        for entry in table_entries:
            team_name = entry['team']['name']
            league_standings[team_name] = {
                "position": entry['position'],
                "team_crest": entry['team']['crest'],
                "points": entry['points'],
                "games_won": entry['won'],
                "games_lost": entry['lost'],
                "goals_for": entry['goalsFor'],
                "goals_against": entry['goalsAgainst'],
                "goal_difference": entry['goalDifference']
            }
        
        # Add the standings data to the main dictionary under "standings"
        all_standings[league_name] = {"standings": league_standings}

# Write the standings data to a JSON file with proper encoding
with open('leagues.json', 'w', encoding='utf-8') as json_file:
    json.dump(all_standings, json_file, indent=4, ensure_ascii=False)
    
print("Standings data has been written to leagues.json")
