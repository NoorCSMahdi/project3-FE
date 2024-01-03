import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import Axios from 'axios';

function ExhibitionPage() {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    // Fetch exhibitions from the API
    Axios.get('/exhibition/index')
      .then(response => {
        setExhibitions(response.data.exhibitions);
      })
      .catch(error => {
        console.error('Error fetching exhibitions:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Exhibitions</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        {exhibitions.map(exhibition => (
          <div key={exhibition._id} className="col mb-4">
            <div className="card">
              <Link to="/carsOfEachExhibitions"> {/* Add the Link component */}
                <img src={exhibition.exhibition_image} className="card-img-top" style={{ width: "100%", height: "auto", objectFit: "contain" }} alt={exhibition.exhibition_name} />
              </Link>
              <div className="card-body">
                <h2 className="card-title">{exhibition.exhibition_name}</h2>
                <p className="card-text">{exhibition.exhibition_description}</p>
                {/* Display other exhibition information as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExhibitionPage;