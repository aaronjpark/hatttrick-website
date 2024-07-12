import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/teammates.css";


const Teammates = ({ teammates }) => {
    return (
      <div className="teammates-container">
        {teammates.map(player => (
          <div className="teammate-card" key={player.id}>
            <img src={player.photo} alt={player.name} className="teammate-photo" />
            <div className="teammate-info">
              {/* Update the player name to be a clickable link */}
              <h4><Link to={`/player/${encodeURIComponent(player.name)}`} className='link'>{player.name}</Link></h4>
              <p>{player.position}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Teammates;
  