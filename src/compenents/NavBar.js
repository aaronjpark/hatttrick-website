import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <section id="navigation-bar">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg className="bi me-2" width="40" height="32">
              <use xlinkHref="#bootstrap"></use>
            </svg>
            <span className="fs-4"><strong>Hatttrick</strong></span>
          </Link>

          <ul className="nav nav-pills">
            <li className="nav-item"><Link to="/" className="nav-link" aria-current="page">Home</Link></li>
            <li className="nav-item"><Link to="/leagues" className="nav-link">Leagues</Link></li>
            <li className="nav-item"><Link to="/clubs" className="nav-link">Clubs</Link></li>
            <li className="nav-item"><Link to="/players" className="nav-link">Players</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
          </ul>
        </header>
      </div>
    </section>
  );
}

export default Navbar;
