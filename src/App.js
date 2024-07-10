import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Players from './pages/Players';
import Leagues from './pages/Leagues';
import About from './pages/About';
import League from './pages/League'; // Import League page component
import Club from './pages/Club';
import PlayerInfo from './pages/player';
import Navbar from '../src/compenents/NavBar';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/players" element={<Players />} />
          <Route path="/about" element={<About />} />
          <Route path="/league/:id" element={<League />} /> {/* Route for league details */}
          <Route path="/club/:name" element={<Club />} /> {/* Updated Route for club details */}
          <Route path="/player/:name" element={<PlayerInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
