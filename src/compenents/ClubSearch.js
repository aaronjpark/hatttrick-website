import React, { useState, useEffect } from 'react';
import '../styles/ClubSearch.css'; // Ensure the CSS is imported

function ClubSearch({ onSearch, onFilter, onSort }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    fetch('https://hatrickdb.wn.r.appspot.com/teams')
      .then(response => response.json())
      .then(data => {
        setTeams(data);
      })
      .catch(error => console.error('Error fetching teams:', error));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
    onFilter(e.target.value); // Fetch and filter players based on the selected team
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search players..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={selectedTeam} onChange={handleTeamChange} className="team-select">
        <option value="">All Teams</option>
        {teams.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearchClick} className="search-button">Search</button>
      <button onClick={handleSortClick} className="sort-button">
        Sort by Name 
      </button>
    </div>
  );
}

export default ClubSearch;
