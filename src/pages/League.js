import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/leagues.css'; // Adjust if needed
import TableComponent from '../compenents/StandingsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const League = () => {
  const { id } = useParams(); // Get the league name from the URL
  const [standingsData, setStandingsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hatrickdb.wn.r.appspot.com/standings/${id}`);
        console.log('Fetched data:', response.data);

        // Check if the position field exists and sort the data
        if (response.data && Array.isArray(response.data)) {
          const sortedData = response.data.sort((a, b) => {
            if (a.position !== undefined && b.position !== undefined) {
              return a.position - b.position;
            }
            return 0;
          });
          console.log('Sorted data:', sortedData);
          setStandingsData(sortedData);
        } else {
          console.error('Data is not in expected format:', response.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [id]); // Dependency array includes id to refetch data when id changes

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

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
