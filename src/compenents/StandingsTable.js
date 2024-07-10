import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import 'bootstrap/dist/css/bootstrap.min.css';

const TableComponent = ({ data }) => {
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
          {Object.keys(data).map((teamName, index) => (
            <tr key={index}>
              <td>{data[teamName].position}</td>
              <td>
                <Link to={`/club/${teamName}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {teamName}
                </Link>
              </td>
              <td>
                <img src={data[teamName].team_crest} alt={teamName} className="team-crest" />
              </td>
              <td>{data[teamName].points}</td>
              <td>{data[teamName].games_won}</td>
              <td>{data[teamName].games_lost}</td>
              <td>{data[teamName].goals_for}</td>
              <td>{data[teamName].goals_against}</td>
              <td>{data[teamName].goal_difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
