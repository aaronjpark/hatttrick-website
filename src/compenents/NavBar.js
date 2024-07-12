import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import logo from './file.png'; // Adjust the path according to your project structure
import '../styles/players.css';

function Navbar() {
  const location = useLocation(); // Get the current location using useLocation()

  // Function to determine if a link should be active
  const isActiveLink = (path) => {
    // Check if the current path matches the link path
    return location.pathname === path;
  };

  return (
    <section id="navigation-bar">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <img src={logo} alt="Hatttrick Logo" width="65" height="50" className="me-2" />
            <span className="fs-4"><strong>Hatttrick</strong></span>
          </Link>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActiveLink('/') ? 'active' : ''}`} aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/leagues" className={`nav-link ${isActiveLink('/leagues') ? 'active' : ''}`}>Leagues</Link>
            </li>
            <li className="nav-item">
              <Link to="/clubs" className={`nav-link ${isActiveLink('/clubs') ? 'active' : ''}`}>Clubs</Link>
            </li>
            <li className="nav-item">
              <Link to="/players" className={`nav-link ${isActiveLink('/players') ? 'active' : ''}`}>Players</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}>About</Link>
            </li>
          </ul>
        </header>
      </div>
    </section>
  );
}

export default Navbar;
