# Hatttrick Website

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

**Problem:** Have you ever wondered about the performance of your favorite soccer player, such as the number of goals they've scored, their team's standing among others, or the league to which a club belongs? Tracking this information can be challenging due to the scattered nature of sports data across various sources and having to keep track of multiple tabs open for different information.

**Solution:** Hatttrick is designed to address this problem by providing a comprehensive platform that consolidates soccer statistics and information in one place. Our website streamlines the process of accessing soccer data, making it easier for fans, analysts, and enthusiasts to stay informed and engaged with the sport.

Hatttrick offers the following capabilities:

- **Player Information:** Easily look up the performance statistics of your favorite soccer players, including position, age, current club, and other key metrics.
- **Club Details:** Find out which league a club is a part of and explore the club's history, location, roster, and rank.
- **League Information:** Access detailed information about various soccer leagues, including participating teams, teams standings, top scorers, and current champions.

## Design

Hatttrick leverages four primary APIs: GitLab REST APIs for project management and continuous integration updating our team member's commits, issues, and Unit tests. API-Football, FootballData API, and RapidAPI for retrieving comprehensive soccer data.

**GitLab REST API** is used to manage our project repository, automate CI/CD pipelines, and gather statistics for dynamic updates on our About page.

**Integration with Hatttrick:**
- **Dynamic Stats on the About Page:** GitLab APIs fetch real-time statistics about the project, including the number of commits, open issues, and recent written unit tests. This information is displayed on the About page to give visitors an up-to-date overview of the project's development activities.
- **Automated Deployments:** CI/CD pipelines managed via GitLab APIs ensure that every change pushed to the repository is automatically built, tested, and deployed, maintaining a continuous delivery workflow.

**API-Football** provides comprehensive soccer data, including player statistics, team standings, and club and league information.

**Integration with Hatttrick:**
- **Player Statistics:** API-Football is used to fetch and display player performance statistics. Users can search for their favorite players and view detailed stats, including age, number, and their current active club.
- **Club Information:** Users can check current team standings in various leagues and access detailed team profiles. This data helps fans stay informed about their favorite team's performance.
- **League Information:** Hatttrick provides users with up-to-date league standings, the current champion, and historical data such as the year founded.

**FootballData API** provides details and information about various football leagues, seasons, and types of data (such as fixtures, results, and player stats) available through their service.

**Integration with Hatttrick:**
- **Player Statistics:** The API is utilized to fetch and display player performance statistics. Users can search for their favorite players and view detailed stats, including goals and their current active club.
- **Club Information:** Users can check current team standings in various leagues and access detailed team profiles. This data helps us layout data to fans who want to stay informed about their favorite team's performance.
- **League Information:** Hatttrick provides users with up-to-date results, games per season played, and country league belongs to.

**RapidAPI** is utilized to access additional soccer-related data and services that complement the data provided by API-Football.

**Integration with Hatttrick:**
- **Enhanced Data Access:** By leveraging RapidAPI, Hatttrick can integrate additional data sources and services that provide deeper insights and expanded soccer-related content. This includes access to specialized statistics about football players like player's names and their nationality for future improvements.
- **Real-time Updates:** RapidAPI facilitates the retrieval of real-time soccer data from various providers, ensuring that users have the most current information about player performance and team standings.
- **Expanded Functionality:** The integration with RapidAPI allows Hatttrick to introduce new features and capabilities by tapping into a broad array of APIs available on the RapidAPI marketplace. This can include services for advanced analytics, and fan engagement tools.

**RESTful API Conclusion**

The integration of GitLab APIs, API-Football, FootballData API, and RapidAPI in the Hatttrick project allows us to create a dynamic platform for soccer enthusiasts. GitLab APIs streamline project management, while the Football APIs offer comprehensive soccer data, enhancing the user experience. By leveraging these APIs, Hattrick delivers real-time information and seamless functionality, meeting the needs of its users effectively.

**Database Models**

[](https://gitlab.com/diegocampos2/cs373-idb/-/wikis/uploads/e1db20052916fbb8e0ee1babc6a2cee3/UML_Class_Diagram.png)

Our database model for hatttrick is designed to efficiently manage and display comprehensive data related to football leagues, clubs, and players. This model consists of three primary tables: leagues, clubs, and players. Each table captures specific attributes of its respective entity, ensuring detailed and organized data storage.

The league table stores information about various football leagues, including attributes such as the league name, country/area played in, the current champion, top scorer, year founded, and the number of games per season. This table has a one-to-many relationship with the clubs table, indicating that a league can have multiple clubs.

The club table contains detailed information about football clubs, including club name, league id, coach name, year founded, club's website, and venue where the club plays home games. This table's many-to-one relationship with leagues signifies that multiple clubs can belong to a single league. Additionally, the clubs' table has a one-to-many relationship with the players' table, reflecting that a club can have multiple players.

The players' table captures data about football players, including player names, player crests, ages, jersey numbers, positions, club id, and teammates' id. The many-to-one relationship with clubs denotes that multiple players can belong to a single club.

The database model employs primary keys for each table (league id, club id, player id) to uniquely identify each record and foreign key constraints (league id, club id, teammates id) to ensure referential integrity between related tables. We choose to design our database as such to offer several advantages, including data integrity through primary and foreign keys, scalability to accommodate additional attributes or relationships, and efficient querying and management of data related to leagues, clubs, and players.

**Searching and Filtering Capabilities**

Filtering, searching, and sorting is available for the clubs and players models. Searching is Google-like handles many terms and results pop up with the highlighted search term to make it more user Friendly.

The Hattrick project provides advanced filtering, searching, and sorting capabilities for both clubs and players. On the [clubs page](https://hatttrick.xyz/clubs), users can search for clubs by name, coach, year founded, and venue. You can also filter clubs betwwen all leagues or a single specific league, and you can quickly sort clubs by alphabetical name in descending or ascending order. This allows users to quickly access and compare detailed club information, enhancing their ability to analyze team performance and league standings.

On the [players page](https://hatttrick.xyz/players), users can search for players by name, number, position, or club they play at. You can also filter results by specific clubs so the players on the page are all players who play for a specifc team. Lastly, you can quickly sort players by alphabetical name in descending or ascending order. This functionality helps users efficiently find player profiles and compare statistics, offering a comprehensive view of individual performances across various teams and leagues. These features make the Hattrick project a powerful tool for accessing and analyzing football data on demand.

## Tools

The combination of Bootstrap Studio, HTML, CSS, and React has been instrumental in developing the front-end of the Hattrick project. Bootstrap Studio provided a robust platform for designing and prototyping the user interface, while HTML and CSS ensured that the website was well-structured, visually appealing, and responsive. React enabled us to build a fast and efficient website with real-time interaction and high concurrency. These tools have laid a solid foundation for the continued development and enhancement of the Hattrick website.

**Front-End Tools and Technologies**

**Bootstrap Studio** is a powerful desktop application for designing and prototyping websites. It provides a range of features that make it an ideal tool for front-end development.

Key Features and Benefits:

- Drag-and-Drop Interface: Bootstrap Studio was used to design the overall layout of the Hattrick website. The drag-and-drop interface allowed for quick arrangement of components and sections.
- Responsive Design: Built-in support for Bootstrap ensures that designs are responsive and look great on all devices.
- Pre-built Components: Pre-built Bootstrap components were customized and integrated into the site, ensuring consistency and responsiveness across different pages.
- Live Preview: The live preview feature facilitated continuous testing and iteration of the design, leading to a more polished final product.

**HTML** is the standard markup language used to create web pages. It provides the structure and content of the hatttrick website.

Key Features and Benefits:

- Content Structuring: HTML was used to define the structure of each page on the Hattrick website, including the placement of headers, footers, and main content areas. Text, images, and other media were embedded into the website using appropriate HTML elements.
- Semantic Elements: HTML forms were created for user inputs, such as search functionalities and contact forms. Semantic HTML tags improve the accessibility and SEO of the website.

**React** is a powerful desktop application for designing and prototyping websites. It provides a range of features that make it an ideal tool for front-end development.

Key Features and Benefits:
- Interface: React was used to create an interactive and responsive user interface. Its component-based architecture allowed us to break down the UI into reusable pieces, making the development process more efficient and the codebase easier to maintain
- Development libraries: React’s extensive ecosystem of libraries and tools supports various development needs, from routing with React Router to handling complex state management with Redux, enabling scalable and maintainable code.

**CSS** is a style sheet language used to describe the presentation of a document written in HTML. It enhances the visual appeal of the website.

Key Features and Benefits:

- Styling: CSS was used to style the HTML elements, defining the colors, fonts, margins, and padding to match the design specifications.
- Customization Design: Custom CSS rules were written to override default Bootstrap styles and achieve a unique look for the Hattrick website.
- Separation of Concerns: By separating content (HTML) from presentation (CSS), it makes the website easier to maintain and update.

**Javascript** is the core scripting language that powers the functionality of our website.

Key Features and Benefits:

- Client-Side Logic: JavaScript was used in conjunction with React to handle client-side logic, manipulate the DOM, and make asynchronous requests to the backend API.
- Versatility: JavaScript's versatility and extensive ecosystem of libraries and frameworks enabled us to implement various features, such as form validation, dynamic content updates, and interactive elements, enhancing the overall user experience.
- Performance: JavaScript’s non-blocking, asynchronous nature ensures smooth and efficient execution of tasks, improving the responsiveness and speed of the web application.

**Back-End Tools and Technologies**

**SQLAlchemy** is an SQL toolkit and Object-Relational Mapping (ORM) library for Python

Key Features and Benefits:

- Pythonic Database Interaction: In Hattrick, SQLAlchemy was used to interact with the database in a more Pythonic way, defining database schemas as Python classes, which made the code more readable and maintainable.
- ORM Capabilities: The ORM capabilities of SQLAlchemy provided an abstraction over raw SQL queries, enabling seamless and secure CRUD operations.
- Database Management: It handled common database tasks like connection pooling and transaction management automatically, ensuring efficient and reliable database interactions.

**Python** served as the primary programming language for the backend of our project.

Key Features and Benefits:

- Simplicity and Readability: Python's simplicity and readability allowed for rapid development and easy collaboration among our team.
- Extensive Libraries: Python's extensive standard library and third-party packages provided all necessary tools for building a robust backend, including handling HTTP requests, interacting with the database, and implementing business logic.
- Versatility: Python's versatility and rich ecosystem made it an ideal choice for our web application, accommodating various development needs efficiently.

**Flask** is a lightweight web framework for Python, designed to make getting started with web development quick and easy.

Key Features and Benefits:

- Simplicity and Flexibility: We chose Flask for its simplicity and flexibility, allowing us to create a modular and scalable backend.
- API Development: Flask provided the necessary tools to build the API endpoints that our frontend communicates with, handling tasks such as routing, request parsing, and response formatting.
- Minimalistic Approach: Its minimalistic approach enabled us to integrate various extensions and libraries as needed, tailoring the backend to the specific requirements of our project.

**Other Tools**

**Postman** is a collaboration platform for API development.

Key Features and Benefits:

- API Testing: Postman was used to test API endpoints, ensuring they function correctly and return expected responses.
- Automation: It allowed for the automation of API tests, helping in maintaining the reliability and performance of the APIs.
- Collaboration: Postman's collaborative features enabled team members to share collections and document APIs, facilitating effective communication and coordination.

**Discord** is a communication platform designed and used for collaborating with our team members.

Key Features and Benefits:

- Real-time Communication: Discord was used for real-time communication among team members, allowing for quick discussions and decision-making.
- Channels and Organization: Its channel organization feature helped in segregating discussions into different topics, keeping the workflow streamlined.
- Integration: Discord's integration capabilities with other tools such as shared programming supported seamless project management, updates, and work flow.

**Visual Studio Code (VS Code)** is a source-code editor used to code hatttrick.

Key Features and Benefits:

- Code Editing: VS Code provided a robust and efficient environment for writing and editing code with features like syntax highlighting and IntelliSense.
- Extensions: Its extensive marketplace of extensions enhanced productivity by adding functionalities such as debugging, version control, and more.
- Customization: VS Code’s customizable interface allowed us to tailor the editor to their specific needs, improving our workflow and efficiency.

**Embedding-Media Services**

In our Hattrick project, we have incorporated several embedded-media features to enhance user engagement and provide valuable information. On the homepage, we integrated YouTube videos that showcase highlights and important matches, offering users a rich multimedia experience right from the start. This feature is designed to keep visitors engaged and provide immediate access to relevant football content.

Additionally, on the Clubs page, we have included direct links to the official websites of the various clubs. This integration allows users to easily access more detailed information about their favorite teams and stay up-to-date with club news and events.

For each individual team's page we have embedded Google Maps links that direct users to the club's venue. This feature provides users with the ability to view the location of the stadium directly on the map, making it easier for fans to find and visit the venue. These embedded-media services not only enhance the overall user experience but also contribute to the functionality and accessibility of the Hattrick website.

## Hosting

To host our web page, we chose Google Cloud Platform (GCP) and utilized App Engine for its ease of use and scalability. Setting up the server on GCP's App Engine involved creating a new project in the GCP Console and configuring App Engine with the necessary runtime environment for our application. We deployed our web application by uploading the code and configuration files, which App Engine automatically managed and scaled as needed. Additionally, we linked our custom domain, hatttrick.xyz, acquired by NameCheap, to the URL provided by Google. This involved verifying domain ownership and updating the DNS settings to point to the App Engine URL, ensuring our website is accessible through our custom domain while benefiting from GCP's reliable infrastructure.

## Authors and Acknowledgments
- Diego Campos
- Diego Pozuelo Clachar
- Aaron Park
- Angel Cerda
- Benjamin Anzaldua

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Project Status
This project is actively maintained. Future updates and improvements are planned.
