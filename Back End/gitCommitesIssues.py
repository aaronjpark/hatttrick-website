import requests

# Define the URLs for the GitLab API requests
commits_url = "https://gitlab.com/api/v4/projects/59212893/repository/commits"
issues_url = "https://gitlab.com/api/v4/projects/59212893/issues"
headers = {
    "PRIVATE-TOKEN": "glpat-TaBkMeTCfWtJXpf6mDKx"
}

# Function to fetch data from a given URL
def fetch_data(url, headers):
    response = requests.get(url, headers=headers)
    return response.json()

# Fetch commits and issues data
commits = fetch_data(commits_url, headers)
issues = fetch_data(issues_url, headers)

# Initialize dictionaries to store the counts
committer_counts = {}
author_issue_counts = {}

# Process each commit
for commit in commits:
    committer_name = commit['committer_name']
    if committer_name in committer_counts:
        committer_counts[committer_name] += 1
    else:
        committer_counts[committer_name] = 1

# Process each issue
for issue in issues:
    author_name = issue['author']['name']
    if author_name in author_issue_counts:
        author_issue_counts[author_name] += 1
    else:
        author_issue_counts[author_name] = 1

# Print the results
print("Committer Counts:")
for committer, count in committer_counts.items():
    print(f"{committer}: {count}")

print("\nAuthor Issue Counts:")
for author, count in author_issue_counts.items():
    print(f"{author}: {count}")
