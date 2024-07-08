import React from 'react';

const PlayerInfo = () => {
  // Data for the player
  const player =  {
    "name": "João Cancelo",
    "age": 29,
    "number": null,
    "position": "Defender",
    "photo": "https://media.api-sports.io/football/players/855.png",
    "club": "Manchester City"
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center">
            <img src={player.photo} className="card-img-top mx-auto mt-4" style={{ width: '150px', height: '200px', objectFit: 'cover' }} alt={player.name} />
            <div className="card-body">
              <h5 className="card-title">{player.name}</h5>
              <ul className="list-group list-group-flush text-start">
                <li className="list-group-item"><strong>Age:</strong> {player.age}</li>
                <li className="list-group-item"><strong>Number:</strong> {player.number}</li>
                <li className="list-group-item"><strong>Position:</strong> {player.position}</li>
                <li className="list-group-item"><strong>Club:</strong> {player.club}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
