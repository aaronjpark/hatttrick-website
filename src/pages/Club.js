import React from "react";

const Club = () => {
  const arsenalInfo = {
    "id": 57,
    "address": "75 Drayton Park London N5 1BU",
    "crest": "https://crests.football-data.org/57.png",
    "website": "http://www.arsenal.com",
    "venue": "Emirates Stadium",
    "founded": 1886,
    "coach": "Mikel Arteta",
    "area": "England"
  };

  // Function to generate Google Maps link for the given address
  const generateMapLink = (address) => {
    const encodedAddress = encodeURIComponent(address.trim());
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  // Generate Google Maps link for Arsenal FC address
  const mapUrl = generateMapLink(arsenalInfo.address);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="text-center mb-4">Arsenal FC Information</h1>
          <div className="card">
            <img src={arsenalInfo.crest} className="card-img-top" alt="Arsenal FC Crest" />
            <div className="card-body">
              <h5 className="card-title">Arsenal FC</h5>
              
              {/* Link to Google Maps */}
              <p className="card-text"><strong>Address:</strong> <a href={mapUrl} target="_blank" rel="noopener noreferrer">{arsenalInfo.address}</a></p>
              
              <p className="card-text"><strong>Website:</strong> <a href={arsenalInfo.website} target="_blank" rel="noopener noreferrer">{arsenalInfo.website}</a></p>
              <p className="card-text"><strong>Venue:</strong> {arsenalInfo.venue}</p>
              <p className="card-text"><strong>Founded:</strong> {arsenalInfo.founded}</p>
              <p className="card-text"><strong>Coach:</strong> {arsenalInfo.coach}</p>
              <p className="card-text"><strong>Area:</strong> {arsenalInfo.area}</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-5">
        <small className="text-muted">Copyright © 2024. Hatttrick. All Rights Reserved.</small>
      </footer>
    </div>
  );
};

export default Club;
