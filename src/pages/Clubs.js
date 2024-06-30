import React from 'react';
import '../styles/clubs.css';

function Clubs() {
  return (
    <div className="container">
      <h1>Clubs</h1>

      <div className="card mb-3 club-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Manchester City</h2>
              <p><strong>League:</strong> Premier League</p>
              <p><strong>Stadium:</strong> Etihad</p>
              <p><strong>City/Location:</strong> Manchester, England</p>
              <p><strong>Trophy Count:</strong> 27</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/mancity.png" className="img-fluid rounded-end club-img" alt="Manchester City" />
          </div>
        </div>
      </div>

      <div className="card mb-3 club-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>FC Barcelona</h2>
              <p><strong>League:</strong> La Liga</p>
              <p><strong>Stadium:</strong> Spotify Camp Nou</p>
              <p><strong>City/Location:</strong> Barcelona, Spain</p>
              <p><strong>Trophy Count:</strong> 98</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/barcalogo.png" className="img-fluid rounded-end club-img" alt="FC Barcelona" />
          </div>
        </div>
      </div>

      <div className="card mb-3 club-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Bayern Munich</h2>
              <p><strong>League:</strong> Bundesliga</p>
              <p><strong>Stadium:</strong> Allianz Arena</p>
              <p><strong>City/Location:</strong> Munich, Germany</p>
              <p><strong>Trophy Count:</strong> 84</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/bayernlogo.png" className="img-fluid rounded-end club-img" alt="Bayern Munich" />
          </div>
        </div>
      </div>

      <footer>
        <small>Copyright © 2024. Hatttrick. All Rights Reserved.</small>
      </footer>
    </div>
  );
}

export default Clubs;
