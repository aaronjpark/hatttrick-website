import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import 'bootstrap/dist/css/bootstrap.min.css';

const TableComponent = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-container">
      <table className="table table-striped table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Crest</th>
            <th>Points</th>
            <th>Games Won</th>
            <th>Games Lost</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            <th>Goal Difference</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={index}>
              <td>{team.position}</td>
              <td>
                <Link to={`/club/${team.team_name}`} className="link">
                  {team.team_name}
                </Link>
              </td>
              <td>
                <img src={team.team_crest} alt={team.team_name} className="team-crest" />
              </td>
              <td>{team.points}</td>
              <td>{team.games_won}</td>
              <td>{team.games_lost}</td>
              <td>{team.goals_for}</td>
              <td>{team.goals_against}</td>
              <td>{team.goal_difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
