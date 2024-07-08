import json

def combine_json_files(output_file, *input_files):
    combined_data = []
    
    for file_name in input_files:
        with open(file_name, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Filter out players without a number
            filtered_data = [player for player in data if player.get('number') is not None]
            combined_data.extend(filtered_data)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, indent=4, ensure_ascii=False)

# List of input files
input_files = [f'../all_teams_players{i}.json' for i in range(12)]

# Output file
output_file = 'combined_teams_players.json'

# Combine the files
combine_json_files(output_file, *input_files)

print(f'Combined JSON file saved as {output_file}')
