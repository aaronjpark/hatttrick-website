import json

# Load JSON data from files
def load_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Save JSON data to files
def save_json(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

# Update team names based on IDs
def update_team_names(leagues_file, teams_file):
    leagues_data = load_json(leagues_file)
    teams_data = load_json(teams_file)

    # Create a dictionary to map team IDs to names from leagues.json
    id_to_name = {}
    for league in leagues_data.values():
        if 'standings' in league:
            for team_name, team_info in league['standings'].items():
                team_id = team_info['id']
                id_to_name[team_id] = team_name

    # Update team names in teams.json
    for league in teams_data.values():
        if 'teams' in league:
            for team_name, team_info in list(league['teams'].items()):
                team_id = team_info['id']
                if team_id in id_to_name:
                    new_team_name = id_to_name[team_id]
                    if new_team_name != team_name:
                        league['teams'][new_team_name] = team_info
                        del league['teams'][team_name]

    # Save the updated teams.json
    save_json(teams_file, teams_data)

# File paths
leagues_file = 'leagues.json'
teams_file = 'teams.json'

# Update team names
update_team_names(leagues_file, teams_file)
