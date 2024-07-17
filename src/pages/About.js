import React, { useState, useEffect } from "react";
import sourcesData from "../data/datasources.json";
import toolsData from "../data/tools.json";
import teamData from "../data/teaminfo.json";
import "../styles/about.css";

function About() {
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalUnitTests, setTotalUnitTests] = useState(0);
  const [commitsFetched, setCommitsFetched] = useState(false);
  const [issuesFetched, setIssuesFetched] = useState(false);

  const commitsUrl =
    "https://gitlab.com/api/v4/projects/59212893/repository/contributors";
  const issuesUrl =
    "https://gitlab.com/api/v4/projects/59212893/issues?per_page=100";
  const headers = {
    "PRIVATE-TOKEN": "glpat-TaBkMeTCfWtJXpf6mDKx",
  };

  async function fetchCommits() {
    try {
      const response = await fetch(commitsUrl, { headers });
      const data = await response.json();

      let commits = 0;
      data.forEach((member) => {
        const teamMember = teamData.find(
          (teamMember) =>
            teamMember.email.toLowerCase() === member.email.toLowerCase()
        );
        if (teamMember && member.commits) {
          teamMember.commits = member.commits;
          commits += member.commits;
        }
      });

      setTotalCommits(commits);
      setCommitsFetched(true);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  }

  async function fetchIssues() {
    try {
      const response = await fetch(issuesUrl, { headers });
      const data = await response.json();

      let totalIssuesCnt = 0;
      let seenSet = new Set();
      data.forEach((issue) => {
        const teamMember = teamData.find(
          (teamMember) => teamMember.gitlab_id === issue.author.username
        );
        if (teamMember) {
          if (!seenSet.has(teamMember.gitlab_id)) {
            seenSet.add(teamMember.gitlab_id);
            teamMember.issues = 0;
          }
          teamMember.issues += 1;
          totalIssuesCnt += 1;
        }
      });
      setTotalIssues(totalIssuesCnt);
      setIssuesFetched(true);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  useEffect(() => {
    if (!commitsFetched) {
      fetchCommits();
    }
    if (!issuesFetched) {
      fetchIssues();
    }
  }, [commitsFetched, issuesFetched]);

  return (
    <div className="people" style={{ padding: "0 20px" }}>
      <h1 className="about-header">Our Team</h1>
      <div className="about-row">
        {teamData.map((member) => (
          <div className="card" key={member.name}>
            <img
              src={member.img_src}
              className="card-img-top about-img"
              alt={member.name}
            />
            <div className="card-body">
              <h5 className="card-title">{member.name}</h5>
              <h6 className="text-muted">Role: {member.role}</h6>
              <p className="card-text">{member.description}</p>
              <p>Issues: {member.issues || 0}</p>
              <p>Commits: {member.commits || 0}</p>
              <p>Unit Tests: {member.unit_tests}</p>
            </div>
          </div>
        ))}
      </div>
      <center style={{ marginTop: "20px" }}>
        <h5>
          <strong>
            Total Commits: {totalCommits} <br />
            Total Issues: {totalIssues} <br />
            Total Unit Tests: 20
          </strong>
        </h5>
      </center>
      <div>
        <h1 className="about-header mb-3">Tools Used</h1>
        <div className="tool-grid">
          {toolsData.map((tool) => (
            <div className="card tool-card" key={tool.name}>
              <img
                src={tool.img_src}
                className="card-img-top tool-card-img mt-4"
                alt={tool.name}
              />
              <div className="card-body">
                <h5 className="card-title">{tool.name}</h5>
                <p className="card-text">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Data Sources Used</h2>
        <div className="row g-4 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">Google Youtube API</h3>
            <p>
              This website provides documentation for the YouTube Data API v3,
              which allows developers to interact with YouTube services. It
              includes information on how to retrieve and manage YouTube content
              such as videos, playlists, and channels programmatically.
            </p>
            <a
              href="https://developers.google.com/youtube/v3"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit Google Youtube API
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">Google Images</h3>
            <p>
              Google Images is a search service provided by Google that allows
              users to search for images on the web. Users can input keywords or
              upload images to find visually similar images, related images, and
              image metadata.
            </p>
            <a
              href="https://images.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit Google Images
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">API-Football</h3>
            <p>
              API-Football is a service that provides access to football
              (soccer) data via an API. It includes comprehensive data about
              leagues, teams, fixtures, live scores, and player statistics,
              enabling developers to integrate this information into their
              applications.
            </p>
            <a
              href="https://www.api-football.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit API-Football
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">FootballData.org</h3>
            <p>
              This page on Football-Data.org provides details about the extent
              of coverage offered by their football API. It includes information
              on the leagues, seasons, and types of data (such as fixtures,
              results, and player stats) available through their service.
            </p>
            <a
              href="https://www.football-data.org/coverage"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit FootballData.org
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">Postman API</h3>
            <p>
              This is a shared workspace on Postman, a platform for API
              development and testing. The workspace contains collections of API
              requests, documentation, and examples for software engineering
              projects, facilitating collaboration and testing.
            </p>
            <a
              href="https://www.postman.com/hatttrick/workspace/hatttrick-workspace/collection/36528627-66c99eba-e737-43e3-bcd3-5a0e56c25fab?action=share&creator=36528627"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit Postman API
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">GitLab</h3>
            <p>
              GitLab is a web-based DevOps lifecycle tool that provides a Git
              repository manager with features such as CI/CD (Continuous
              Integration/Continuous Deployment) pipeline automation, issue
              tracking, and project management. It helps teams collaborate on
              code, track issues, and deploy applications.
            </p>
            <a
              href="https://gitlab.com/diegocampos2/cs373-idb"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit GitLab Repo
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
            <a
              href="https://gitlab.com/diegocampos2/cs373-idb/-/wikis/Home-Hattrick?redirected_from=home"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit GitLab Wiki
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
            <a
              href="https://gitlab.com/diegocampos2/cs373-idb/-/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              Visit GitLab Issues
              <svg className="bi">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container px-4 py-5" id="data-scraping">
        <h2 className="pb-2 border-bottom">How We Scraped Our Data</h2>
        <p>
          We collectively scraped the data on football clubs, leagues, and
          players using various APIs. The clubScraper.py script fetches team
          data from different leagues such as the Premier League and Ligue 1
          using the Football Data API, retrieving details like team names,
          addresses, and crests. The leagueScraper.py script gathers information
          on football leagues, including team statistics and fixtures, using the
          API Sports data provider, and saves this data in a JSON file. Lastly,
          the playerScraper.py script uses the team data from clubScraper.py to
          fetch detailed player information, such as names, ages, and positions,
          saving the player data along with team associations in a JSON file.
          Together, these scripts automate the comprehensive collection of
          football data, organizing it efficiently for further use or analysis.
        </p>
      </div>
    </div>
  );
}

export default About;
