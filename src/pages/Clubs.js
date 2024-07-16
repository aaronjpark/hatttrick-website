import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../compenents/searchBar';
import Pagination from '../compenents/Pagination';
import '../styles/clubs.css';

function Clubs() {
  const [teamsData, setTeamsData] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [leagueNames, setLeagueNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 12; // Number of teams per page

  useEffect(() => {
    fetch('https://hatrickdb.wn.r.appspot.com/teams')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging to see fetched data structure
        setTeamsData(data);
        setFilteredTeams(data); // Initialize filtered teams with all data
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const fetchLeagueName = async (leagueId) => {
      if (!leagueNames[leagueId]) {
        try {
          const response = await fetch(`https://hatrickdb.wn.r.appspot.com/league/${leagueId}`);
          const data = await response.json();
          setLeagueNames(prevState => ({ ...prevState, [leagueId]: data.name }));
        } catch (error) {
          console.error('Error fetching league name:', error);
        }
      }
    };

    filteredTeams.forEach(team => fetchLeagueName(team.league_id));
  }, [filteredTeams, leagueNames]);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to slice teams for pagination
  const sliceTeamsForPage = () => {
    const startIndex = (currentPage - 1) * perPage;
    return filteredTeams.slice(startIndex, startIndex + perPage);
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    const filtered = teamsData.filter(team => {
      const queryLower = query.toLowerCase();
      return (
        team.name.toLowerCase().includes(queryLower) ||
        (leagueNames[team.league_id] && leagueNames[team.league_id].toLowerCase().includes(queryLower)) ||
        (team.coach && team.coach.toLowerCase().includes(queryLower)) ||
        (team.founded && team.founded.toString().includes(queryLower)) ||
        (team.venue && team.venue.toLowerCase().includes(queryLower))
      );
    });
    setFilteredTeams(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Function to highlight search term
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
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
  const totalPages = Math.ceil(filteredTeams.length / perPage);

  return (
    <div className="clubs-container">
      <header className="header">
        <h1>Clubs Information</h1>
        <SearchBar onSearch={handleSearch} />
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
                    {highlightText(team.name, searchQuery)}
                  </Link>
                </h3>
                <p className="card-text">
                  League: <Link to={`/league/${encodeURIComponent(team.league_id)}`} className="link">{highlightText(leagueNames[team.league_id] || 'Loading...', searchQuery)}</Link>
                </p>
                <p className="card-text">Coach: {highlightText(team.coach || 'currently not available', searchQuery)}</p>
                <p className="card-text">Founded: {highlightText(team.founded.toString(), searchQuery)}</p>
                <p className="card-text">Venue: {highlightText(team.venue, searchQuery)}</p>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Clubs;
