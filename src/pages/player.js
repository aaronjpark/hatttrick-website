import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';  // Import Link from react-router-dom
import Teammates from '../compenents/teammates';

const PlayerInfo = () => {
  const [player, setPlayer] = useState(null);
  const [teammates, setTeammates] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playerResponse = await axios.get(`https://hatrickdb.wn.r.appspot.com/players/${name}`);
        setPlayer(playerResponse.data);

        const teammatesResponse = await axios.get(`https://hatrickdb.wn.r.appspot.com/teammates/${name}`);
        setTeammates(teammatesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name]);

  if (!player) {
    return <div>Loading player data...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center">
            <img
              src={player.photo}
              className="card-img-top mx-auto mt-4"
              style={{ width: '150px', height: '200px', objectFit: 'cover' }}
              alt={player.name}
            />
            <div className="card-body">
              <h5 className="card-title">{player.name}</h5>
              <ul className="list-group list-group-flush text-start">
                <li className="list-group-item"><strong>Age:</strong> {player.age}</li>
                <li className="list-group-item"><strong>Number:</strong> {player.number}</li>
                <li className="list-group-item"><strong>Position:</strong> {player.position}</li>
                <li className="list-group-item">
                  <strong>Club: </strong> 
                  <Link to={`/club/${player.club}`} className='link'>
                    {player.club}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="teammates-header text-center my-4">
        <h3>{name}'s Teammates</h3>
      </div>
      <Teammates teammates={teammates} />
    </div>
  );
};

export default PlayerInfo;
