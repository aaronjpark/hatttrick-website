import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/players.css';

function Players() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 16; // Number of players per page (4 players per row in a 4-column grid)

  useEffect(() => {
    fetchPlayers();
  }, [currentPage]); // Fetch players whenever currentPage changes

  const fetchPlayers = () => {
    fetch(`http://127.0.0.1:5000/players?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched players:', data); // Debugging to see fetched data structure
        setPlayers(data);
      })
      .catch(error => console.error('Error fetching players:', error));
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of pages
  const totalPages = Math.ceil(players.length / perPage);

  // Function to slice players for current page
  const slicePlayersForPage = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return players.slice(startIndex, endIndex);
  };

  // Function to handle navigating to previous and next pages
  const goToPreviousPages = () => {
    if (currentPage > 2) {
      setCurrentPage(currentPage - 2);
    } else if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const goToNextPages = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 2);
    } else if (currentPage === totalPages - 1) {
      setCurrentPage(totalPages);
    }
  };

  // Function to handle navigating to the last page
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Centered pagination style
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  return (
    <div className="players-container">
      <header className="header">
        <h1>Players Information</h1>
      </header>
      <div className="players-grid">
        {slicePlayersForPage().map(player => (
          <div className="player-card card" key={player.name}>
            <img
              src={player.photo}
              className="card-img-top img-fluid"
              alt={player.name}
            />
            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/player/${encodeURIComponent(player.name)}`} className="link-style">
                  {player.name}
                </Link>
              </h3>
              <p className="card-text"><b>Age:</b> {player.age}</p>
              <p className="card-text"><b>Number:</b> {player.number}</p>
              <p className="card-text"><b>Position:</b> {player.position}</p>
              <p className="card-text"><b>Club:</b>
                <Link to={`/club/${encodeURIComponent(player.club)}`}>
                  {player.club}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div style={paginationStyle}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>First</button>
            </li>
            <li className={`page-item ${currentPage <= 2 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPreviousPages}>Previous</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage)}>{currentPage}</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToNextPages}>Next</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToLastPage}>Last</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Players;
