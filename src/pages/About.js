import React, { useState, useEffect } from "react";
import sourcesData from '../data/datasources.json';
import toolsData from '../data/tools.json';
import teamData from '../data/teaminfo.json';
import '../styles/about.css';

function About() {
    const [totalCommits, setTotalCommits] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [commitsFetched, setCommitsFetched] = useState(false);
    const [issuesFetched, setIssuesFetched] = useState(false);

    const commitsUrl = "https://gitlab.com/api/v4/projects/59212893/repository/contributors";
    const issuesUrl = "https://gitlab.com/api/v4/projects/59212893/issues?per_page=100";
    const headers = {
        "PRIVATE-TOKEN": "glpat-TaBkMeTCfWtJXpf6mDKx"
    };

    async function fetchCommits() {
        try {
            const response = await fetch(commitsUrl, { headers });
            const data = await response.json();

            let commits = 0;
            data.forEach((member) => {
                const teamMember = teamData.find((teamMember) => teamMember.email === member.email);
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
                
                    const teamMember = teamData.find((teamMember) => teamMember.gitlab_id === issue.author.username);
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
                   
            <div className="people">
                <h1 className="about-header">Our Team</h1>
                
                <div className="about-row">
                    {teamData.map(member => (
                        <div className="card" key={member.name}>
                            <img src={member.img_src} className="card-img-top about-img" alt={member.name} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {member.name}
                                </h5>
                                <h6 className="text-muted">
                                    Role: {member.role}
                                </h6>
                                <p className="card-text">{member.description}</p>
                                <p>Issues : {member.issues || 0}</p>
                                <p>Commits: {member.commits || 0}</p>
                                <p>Unit Tests: {member.unit_tests}</p>
                            </div>
                           
                        </div>
                    ))}
                </div>
                <center style={{ marginTop: '20px' }}>
                    <p>
                        Total Commits: {totalCommits} <br/>
                        Total Issues: {totalIssues}
                    </p>
                </center>
                <div>
                    <h1 className="about-header">Tools Used</h1>
                    <div className="tool-grid">
                        {toolsData.map(member => (
                            <div className="card tool-card" key={member.name}>
                                <img src={member.img_src} className="card-img-top tool-card-img" alt={member.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{member.name}</h5>
                                    <p className="card-text">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="sources-header">Data Sources</h1>
                    <ul>
                        {sourcesData.data_sources.map((member, index) => (
                            <li key={index}>
                                <a href={member} target="_blank" rel="noopener noreferrer">{member}</a>
                            </li>
                        ))}
                    </ul>
                    
                    <h1 className="sources-header">Postman API</h1>
                    <ul>
                        <li>
                            <a href="https://software-engineering-3016.postman.co/workspace/Software-Engineering-Workspace~3f64ce8f-8b3b-487e-a067-56d3a2e3d512/collection/36528627-9970bfc9-552b-4d2f-9543-d02690a67499?action=share&creator=36528627">
                                Postman API
                            </a>
                       
                        </li>
                     </ul>
                    <h1 className="sources-header">Gitab Info</h1>

                    <ul>
                        <li>
                        <a href="https://gitlab.com/diegocampos2/cs373-idb">
                                    Gitlab Repo
                         </a>
                         </li>
                    </ul>
                    <ul>
                    <li>
                        <a href="https://gitlab.com/diegocampos2/cs373-idb/-/wikis/Home-Hattrick?redirected_from=home">
                                    Gitlab Wiki
                         </a>
                         </li>
                    </ul>
                    <ul>
                    <li>
                        <a href="https://gitlab.com/diegocampos2/cs373-idb/-/issues">
                                    Gitlab Issues
                         </a>
                    </li>
                    </ul>
                </div>
            </div>
       
    );
}

export default About;
