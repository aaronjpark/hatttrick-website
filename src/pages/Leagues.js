import React from 'react';
import '../styles/leagues.css';

function Leagues() {
  return (
    <div className="container">
      <h1>Leagues</h1>
      
      <div className="card mb-3 league-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Premier League</h2>
              <p><strong>Country:</strong> England</p>
              <p><strong>Current Champion:</strong> Manchester City</p>
              <p><strong>Top Scorer:</strong> Erling Haaland</p>
              <p><strong>Year Founded:</strong> 1992</p>
              <p><strong>Games Per Season:</strong> 38</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/premlogo.jpeg" className="img-fluid rounded-end league-img" alt="Premier League" />
          </div>
        </div>
      </div>
      
      <div className="card mb-3 league-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>La Liga</h2>
              <p><strong>Country:</strong> Spain</p>
              <p><strong>Current Champion:</strong> Real Madrid</p>
              <p><strong>Top Scorer:</strong> Alexander Sørloth</p>
              <p><strong>Year Founded:</strong> 1929</p>
              <p><strong>Games Per Season:</strong> 38</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/laligalogo.png" className="img-fluid rounded-end league-img" alt="La Liga" />
          </div>
        </div>
      </div>
      
      <div className="card mb-3 league-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Bundesliga</h2>
              <p><strong>Country:</strong> Germany</p>
              <p><strong>Current Champion:</strong> Bayern Leverkusen</p>
              <p><strong>Top Scorer:</strong> Harry Kane</p>
              <p><strong>Year Founded:</strong> 1962</p>
              <p><strong>Games Per Season:</strong> 34</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/bundesligalogo.png" className="img-fluid rounded-end league-img" alt="Bundesliga" />
          </div>
        </div>
      </div>
      
      <footer>
        <small>Copyright © 2024. Hatttrick. All Rights Reserved.</small>
      </footer>
    </div>
  );
}

export default Leagues;
