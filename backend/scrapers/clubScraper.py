import requests
import json

# API endpoint base and authentication key
api_base_url = "http://api.football-data.org/v4/competitions/{}/teams?season=2023"
auth_key = "8174f2a7ea1b41138e79173d7f0affa7"

# Headers for the request
headers = {
    "X-Auth-Token": auth_key
}

# Dictionary of football leagues
football_leagues = {
    "Premier League": "PL",
    "Ligue 1": "FL1",
    "Bundesliga": "BL1",
    "Serie A": "SA",
    "Primera Division": "PD"
}

# Function to scrape team data
def scrape_league_data(league_name, league_code):
    api_url = api_base_url.format(league_code)
    response = requests.get(api_url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        teams = data.get("teams", [])
        
        league_teams = {}
        for team in teams:
            team_name = team.get("name")
            league_teams[team_name] = {
                "id":team.get("id"),
                "address": team.get("address"),
                "crest": team.get("crest"),
                "website": team.get("website"),
                "venue": team.get("venue"),
                "founded": team.get("founded"),
                "coach": team.get("coach", {}).get("name"),
                "area": team.get("area", {}).get("name")
            }
        
        return league_teams
    else:
        print(f"Failed to retrieve data for {league_name}: {response.status_code}")
        return {}

# Dictionary to store all teams data
all_teams = {}

# Iterate over the leagues and scrape data
for league_name, league_code in football_leagues.items():
    print(f"Fetching teams for {league_name}...")
    league_teams = scrape_league_data(league_name, league_code)
    if league_teams:
        all_teams[league_name] = {"teams": league_teams}

# Write the teams data to a JSON file with proper encoding
with open('teams.json', 'w', encoding='utf-8') as json_file:
    json.dump(all_teams, json_file, indent=4, ensure_ascii=False)
    
print("Teams data has been written to teams.json")
