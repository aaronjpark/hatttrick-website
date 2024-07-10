import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/leagues.css'; // Adjust if needed
import TableComponent from '../compenents/StandingsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const League = () => {
  const { id } = useParams(); // Get the league name from the URL
  const [standingsData, setStandingsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5002/standings/${id}`);
        setStandingsData(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Dependency array includes id to refetch data when id changes

  return (
    <div className="container my-4"> {/* Added Bootstrap classes for margin */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">{id} Standings</h1> {/* Display dynamic league name */}

          <TableComponent data={standingsData} /> {/* Pass fetched data as prop */}

          
        </div>
      </div>
    </div>
  );
}

export default League;
