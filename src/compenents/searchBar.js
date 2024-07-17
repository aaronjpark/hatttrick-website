import React, { useState } from 'react';
import '../styles/SearchBar.css';

const leagues = [
    { name: "Premier League", value: "Premier League" },
    { name: "Primera Division", value: "Primera Division" },
    { name: "Bundesliga", value: "Bundesliga" },
    { name: "Serie A", value: "Serie A" },
    { name: "Ligue 1", value: "Ligue 1" }
];

const SearchBar = ({ onSearch, onFilter, onSort }) => {
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
            <button onClick={onSort}>Sort by Name</button>
        </div>
    );
};

export default SearchBar;
