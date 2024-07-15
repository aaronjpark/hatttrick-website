import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/players.css';
import SearchBar from '../compenents/searchBar';

function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 16; // Number of players per page (4 players per row in a 4-column grid)

  useEffect(() => {
    fetchPlayers();
  }, [currentPage]); // Fetch players whenever currentPage changes

  const fetchPlayers = () => {
    fetch(`https://hatrickdb.wn.r.appspot.com/players?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched players:', data); // Debugging to see fetched data structure
        setPlayers(data);
        setFilteredPlayers(data); // Initialize filtered players with all data
      })
      .catch(error => console.error('Error fetching players:', error));
  };

  // Function to handle search
  const handleSearch = (query) => {
    filterPlayers(query, selectedLeague);
  };

  // Function to handle league filter
  const handleFilter = (league) => {
    setSelectedLeague(league);
    filterPlayers(searchQuery, league);
  };

  // State for search query and selected league
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');

  // Function to filter players based on query and league
  const filterPlayers = (query, league) => {
    let filtered = players;

    if (query) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (league) {
      filtered = filtered.filter(player => player.league_id === parseInt(league, 10));
    }

    setFilteredPlayers(filtered);
    setCurrentPage(1); // Reset to first page on filter
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of pages
  const totalPages = Math.ceil(filteredPlayers.length / perPage);

  // Function to slice players for current page
  const slicePlayersForPage = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredPlayers.slice(startIndex, endIndex);
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
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
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
                <Link to={`/player/${encodeURIComponent(player.name)}`} className="link">
                  {player.name}
                </Link>
              </h3>
              <p className="card-text"><b>Age:</b> {player.age}</p>
              <p className="card-text"><b>Number:</b> {player.number}</p>
              <p className="card-text"><b>Position:</b> {player.position}</p>
              <p className="card-text"><b>Club:</b>
                <Link to={`/club/${encodeURIComponent(player.club)}`} className="link">
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
