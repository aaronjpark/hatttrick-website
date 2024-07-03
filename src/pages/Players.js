import React from 'react';
import '../styles/players.css';

function Players() {
  return (
    <div className="container">
      <h1>Players</h1>

      <div className="card mb-3 player-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Erling Haaland</h2>
              <p><strong>Name:</strong> Erling Haaland</p>
              <p><strong>Age:</strong> 23</p>
              <p><strong>Club:</strong> Manchester City</p>
              <p><strong>Position:</strong> Striker (ST)</p>
              <p><strong>Nationality:</strong> Norway</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/haaland.png" className="img-fluid rounded-end player-img" alt="Erling Haaland" />
          </div>
        </div>
      </div>

      <div className="card mb-3 player-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Pedri</h2>
              <p><strong>Name:</strong> Pedri Gonzalez</p>
              <p><strong>Age:</strong> 21</p>
              <p><strong>Club:</strong> FC Barcelona</p>
              <p><strong>Position:</strong> Midfielder (CM)</p>
              <p><strong>Nationality:</strong> Spain</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/pedri.jpeg" className="img-fluid rounded-end player-img" alt="Pedri" />
          </div>
        </div>
      </div>

      <div className="card mb-3 player-card">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2>Jamal Musiala</h2>
              <p><strong>Name:</strong> Jamal Musiala</p>
              <p><strong>Age:</strong> 20</p>
              <p><strong>Club:</strong> Bayern Munich</p>
              <p><strong>Position:</strong> Attacking Midfielder (CAM)</p>
              <p><strong>Nationality:</strong> Germany</p>
            </div>
          </div>
          <div className="col-md-4">
            <img src="../Assets/musiala.png" className="img-fluid rounded-end player-img" alt="Jamal Musiala" />
          </div>
        </div>
      </div>

      <footer className="text-center mt-3">
        <small>Copyright © 2024. Hatttrick. All Rights Reserved.</small>
      </footer>
    </div>
  );
}

export default Players;
