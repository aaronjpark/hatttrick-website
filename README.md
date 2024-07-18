# cs373-idb

## Canvas Group Number 2

### Team Members:
- Diego Campos
- Diego Pozuelo Clachar
- Aaron Park
- Angel Cerda
- Benjamin Anzaldua

## Project Overview
This project involves scraping data on football clubs, leagues, and players using various APIs. We developed a set of scripts that automate the collection of comprehensive football data, organizing it efficiently for further use or analysis.

## How We Scraped Our Data
We collectively scraped the data on football clubs, leagues, and players using various APIs. The `clubScraper.py` script fetches team data from different leagues such as the Premier League and Ligue 1 using the Football Data API, retrieving details like team names, addresses, and crests. The `leagueScraper.py` script gathers information on football leagues, including team statistics and fixtures, using the API Sports data provider, and saves this data in a JSON file. Lastly, the `playerScraper.py` script uses the team data from `clubScraper.py` to fetch detailed player information, such as names, ages, and positions, saving the player data along with team associations in a JSON file. Together, these scripts automate the comprehensive collection of football data, organizing it efficiently for further use or analysis.

## Features
- **Football Clubs Data:** Detailed information about football clubs from various leagues.
- **Leagues Data:** Comprehensive data on football leagues, including statistics and fixtures.
- **Players Data:** In-depth details on players, including names, ages, and positions.
- **User-Friendly Interface:** Easy navigation and access to data for users.
- **Search Functionality:** Quickly find specific clubs, leagues, or players using the search feature.

## Installation
1. Clone the repository:
    ```bash
    git clone https://gitlab.com/diegocampos2/cs373-idb.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cs373-idb
    ```
3. Install the necessary dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the scraping scripts:
    ```bash
    python clubScraper.py
    python leagueScraper.py
    python playerScraper.py
    ```

## Usage
1. Start the application:
    ```bash
    python app.py
    ```
2. Open your web browser and go to `http://localhost:5000` to access the application.

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Create a pull request.

## Introduction

Problem: Have you ever wondered about the performance of your favorite soccer player, such as the number of goals they've scored, their team's standing among others, or the league to which a club belongs? Tracking this information can be challenging due to the scattered nature of sports data across various sources and having to keep track of multiple tabs open for different information.

Solution: Hatttrick is designed to address this problem by providing a comprehensive platform that consolidates soccer statistics and information in one place. Our website streamlines the process of accessing soccer data, making it easier for fans, analysts, and enthusiasts to stay informed and engaged with the sport.

Hatttrick offers the following capabilities:

- Player Information: Easily look up the performance statistics of your favorite soccer players, including position, age, current club, and other key metrics.
- Club Details: Find out which league a club is a part of and explore the club's history, location, roster, and rank.
- League Information: Access detailed information about various soccer leagues, including participating teams, teams standings, top scorers, and current champions.

## Design


## Authors and Acknowledgments
- Diego Campos
- Diego Pozuelo Clachar
- Aaron Park
- Angel Cerda
- Benjamin Anzaldua

Special thanks to hatttrick.xyz for inspiration and data references.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Project Status
This project is actively maintained. Future updates and improvements are planned.
