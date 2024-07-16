import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../compenents/searchBar';
import Pagination from '../compenents/Pagination';
import '../styles/players.css';

function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [clubs, setClubs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const perPage = 20; // Number of players per page (5 rows of 4)

  useEffect(() => {
    fetchPlayers();
    fetchClubs();
  }, []);

  useEffect(() => {
    filterPlayers(searchQuery, selectedLeague);
  }, [players, searchQuery, selectedLeague]);

  const fetchPlayers = () => {
    fetch(`https://hatrickdb.wn.r.appspot.com/players`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched players:', data); // Debugging to see fetched data structure
        setPlayers(data);
        setFilteredPlayers(data); // Initialize filtered players with all data
      })
      .catch(error => console.error('Error fetching players:', error));
  };

  const fetchClubs = () => {
    fetch('https://hatrickdb.wn.r.appspot.com/teams')
      .then(response => response.json())
      .then(data => {
        const clubMap = {};
        data.forEach(club => {
          clubMap[club.name] = club.league_id;
        });
        setClubs(clubMap);
      })
      .catch(error => console.error('Error fetching clubs:', error));
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to handle league filter
  const handleFilter = (league) => {
    setSelectedLeague(league);
  };

  // Function to filter players based on query and league
  const filterPlayers = (query, league) => {
    let filtered = players;

    if (query) {
      filtered = filtered.filter(player => {
        const queryLower = query.toLowerCase();
        return (
          (player.name && player.name.toLowerCase().includes(queryLower)) ||
          (player.age && player.age.toString().toLowerCase().includes(queryLower)) ||
          (player.number && player.number.toString().toLowerCase().includes(queryLower)) ||
          (player.position && player.position.toLowerCase().includes(queryLower)) ||
          (player.club && player.club.toLowerCase().includes(queryLower)) ||
          (player.nationality && player.nationality.toLowerCase().includes(queryLower)) || // Include additional fields if necessary
          (player.team && player.team.toLowerCase().includes(queryLower))
        );
      });
    }

    if (league) {
      filtered = filtered.filter(player => clubs[player.club] === parseInt(league, 10));
    }

    setFilteredPlayers(filtered);
    setCurrentPage(1); // Reset to first page on filter
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to highlight search term
  const highlightText = (text, highlight) => {
    if (!text || !highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Total number of pages
  const totalPages = Math.ceil(filteredPlayers.length / perPage);

  // Function to slice players for current page
  const slicePlayersForPage = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredPlayers.slice(startIndex, endIndex);
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
                  {highlightText(player.name, searchQuery)}
                </Link>
              </h3>
              <p className="card-text"><b>Age:</b> {highlightText(player.age?.toString() || '', searchQuery)}</p>
              <p className="card-text"><b>Number:</b> {highlightText(player.number?.toString() || '', searchQuery)}</p>
              <p className="card-text"><b>Position:</b> {highlightText(player.position || '', searchQuery)}</p>
              <p className="card-text"><b>Club:</b>
                <Link to={`/club/${encodeURIComponent(player.club)}`} className="link">
                  {highlightText(player.club || '', searchQuery)}
                </Link>
              </p>
              <p className="card-text"><b>Nationality:</b> {highlightText(player.nationality || '', searchQuery)}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Players;
