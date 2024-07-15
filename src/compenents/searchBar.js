import React, { useState } from 'react';
import '../styles/SearchBar.css';

const leagues = [
    { name: "Premier League", value: "1" },
    { name: "Primera Division", value: "5" },
    { name: "Bundesliga", value: "3" },
    { name: "Serie A", value: "4" },
    { name: "Ligue 1", value: "2" }
];

const SearchBar = ({ onSearch, onFilter }) => {
    const [query, setQuery] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <select value={selectedLeague} onChange={handleLeagueChange}>
                <option value="">All Leagues</option>
                {leagues.map(league => (
                    <option key={league.value} value={league.value}>{league.name}</option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar;
