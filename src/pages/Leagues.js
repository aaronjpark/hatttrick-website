import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import '../styles/leagues.css';
import leaguesData from '../data/leagueinfo.json'; // Adjust the path as necessary

function Leagues() {
  return (
    <div className="container">
      <h1>Leagues</h1>
      {leaguesData.Leagues.map((league, index) => (
        <div key={index} className="card mb-3 league-card">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                {/* Make league name clickable */}
                <h2><Link to={`/league/${league.League}`} style={{ textDecoration: 'none', color: 'inherit' }}>{league.League}</Link></h2>
                <p><strong>Country:</strong> {league.Country}</p>
                <p><strong>Current Champion:</strong> <Link to={`/club/${league['Current Champion']}`} style={{ textDecoration: 'none' }}>{league['Current Champion']}</Link></p>
                <p><strong>Top Scorer:</strong> <Link to={`/player/${league['Top Scorer']}`} style={{ textDecoration: 'none' }}>{league['Top Scorer']}</Link></p>
                <p><strong>Year Founded:</strong> {league['Year Founded']}</p>
                <p><strong>Games Per Season:</strong> {league['Games Per Season']}</p>
              </div>
            </div>
            <div className="col-md-4">
              <img src={league.Img} className="img-fluid rounded-end league-img" alt={league.League} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leagues;
