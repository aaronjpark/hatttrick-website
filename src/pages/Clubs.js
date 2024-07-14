import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/clubs.css';

function Clubs() {
  const [teamsData, setTeamsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12; // Number of teams per page

  useEffect(() => {
    fetch('https://hatrickdb.wn.r.appspot.com/teams')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging to see fetched data structure
        setTeamsData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to slice teams for pagination
  const sliceTeamsForPage = () => {
    const startIndex = (currentPage - 1) * perPage;
    return teamsData.slice(startIndex, startIndex + perPage);
  };

  // Total number of pages
  const totalPages = Math.ceil(teamsData.length / perPage);

  // Centered pagination style
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Adjust margin as needed
  };

  return (
    <div className="clubs-container">
      <header className="header">
        <h1>Clubs Information</h1>
      </header>
      <div className="teams-grid">
        <div className="teams-row">
          {sliceTeamsForPage().map((team) => (
            <div className="team-card card" key={team.id}>
              <img
                src={team.crest}
                className="card-img-top img-fluid"
                alt={team.name}
              />
              <div className="card-body">
                <h3 className="card-title">
                  <Link to={`/club/${encodeURIComponent(team.name)}`} className="link">
                    {team.name}
                  </Link>
                </h3>
                <p className="card-text">
                  League: <Link to={`/league/${encodeURIComponent(team.league_id)}`} className="link">{team.league_id}</Link>
                </p>
                <p className="card-text">Coach: {team.coach}</p>
                <p className="card-text">Founded: {team.founded}</p>
                <p className="card-text">Venue: {team.venue}</p>
                <a
                  href={team.website}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Centered Pagination */}
        <div style={paginationStyle}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Clubs;
