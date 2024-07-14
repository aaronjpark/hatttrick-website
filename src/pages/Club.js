import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/club.css'; // Ensure the CSS is correctly linked
import Teammates from '../compenents/teammates'; 

const Club = () => {
  const { name } = useParams();
  const [clubInfo, setClubInfo] = useState(null);
  const [teammates, setTeammates] = useState([]);
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const clubResponse = await axios.get(`https://hatrickdb.wn.r.appspot.com/club/${name}`);
        const clubData = clubResponse.data;

        console.log(clubData); // Debugging line

        if (clubData) {
          setClubInfo(clubData);
        } else {
          throw new Error('Club data not found');
        }

        const teammatesResponse = await axios.get(`https://hatrickdb.wn.r.appspot.com/players/team/${name}`);
        setTeammates(teammatesResponse.data);

        const teamsResponse = await axios.get('https://hatrickdb.wn.r.appspot.com/teams');
        const teamsData = teamsResponse.data;

        console.log(teamsData); // Debugging line

        // Iterate over teamsData array to find the league of the club
        if (Array.isArray(teamsData)) {
          const leagueName = teamsData.find(team => team.name === name)?.league_id;
          setLeague(leagueName);
          console.log(leagueName); // Debugging line
        } else {
          setError("No teams data available.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubInfo();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clubInfo) return <div>No club information available.</div>;

  return (
    <div className="club-details-container">
      <header className="club-details-header">
        <h1>{name}'s Information</h1>
      </header>
      <div className="club-details-grid">
        <div className="club-details-card">
          <img src={clubInfo.crest} className="card-img-top" alt="Club Crest" />
          <div className="card-body">
            <h3 className="card-title">{clubInfo.name}</h3>
            <p className="card-text"><strong>League: </strong>
              {league ? (
                <Link to={`/league/${encodeURIComponent(league)}`} className="link">
                  {league}
                </Link>
              ) : 'N/A'}
            </p>
            <p className="card-text"><strong>Address:</strong>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clubInfo.address)}`}
                 target="_blank"
                 rel="noopener noreferrer">
                {clubInfo.address}
              </a>
            </p>
            <p className="card-text"><strong>Website:</strong>
              <a href={/^https?:\/\//.test(clubInfo.website) ? clubInfo.website : `http://${clubInfo.website}`}
                 className='li'>
                {clubInfo.website}
              </a>
            </p>
            <p className="card-text"><strong>Venue:</strong> {clubInfo.venue}</p>
            <p className="card-text"><strong>Founded:</strong> {clubInfo.founded}</p>
            <p className="card-text"><strong>Coach:</strong> {clubInfo.coach}</p>
            <p className="card-text"><strong>Area:</strong> {clubInfo.area}</p>
          </div>
        </div>
      </div>
      <div className="club-details-header text-center mt-4">
        <h3>{name}'s Team</h3>
      </div>
      <Teammates teammates={teammates} />
    </div>
  );
};

export default Club;