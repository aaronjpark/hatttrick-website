import json

def load_data(filepath):
    """Load JSON data from a file."""
    with open(filepath, 'r') as file:
        return json.load(file)

def save_data(data, file_path):
    """Save JSON data to a file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

def update_team_names(leagues_data, teams_data):
    """Update team names in leagues_data using IDs from teams_data."""
    # Creating ID to name map from teams_data
    id_to_name = {team['id']: team_name for league in teams_data.values()
                  for team_name, team in league['teams'].items()}

    # Update team names in leagues_data
    for league_info in leagues_data.values():
        for team_name, team_details in list(league_info['standings'].items()):
            team_id = team_details['id']
            if team_id in id_to_name:
                new_name = id_to_name[team_id]
                league_info['standings'][new_name] = league_info['standings'].pop(team_name)

def main():
    teams_data = load_data('teams.json')
    leagues_data = load_data('leagues.json')
    update_team_names(leagues_data, teams_data)
    save_data(leagues_data, 'updated_leagues.json')

if __name__ == '__main__':
    main()
