import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom
import './styles.css';
import Navbar from './compenents/NavBar';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Players from './pages/Players';
import Leagues from './pages/Leagues';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Use Routes instead of Route directly */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/players" element={<Players />} /> 
          <Route path="/about" element={<About />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
