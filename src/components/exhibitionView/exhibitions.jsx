import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExhibitionPage() {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    // Fetch exhibitions from the API
    axios.get('/api/exhibitions')
      .then(response => {
        setExhibitions(response.data);
      })
      .catch(error => {
        console.error('Error fetching exhibitions:', error);
      });
  }, []);

  return (
    <div>
      <h1>Exhibitions</h1>
      {exhibitions.map(exhibition => (
        <div key={exhibition._id}>
          <h2>{exhibition.exhibition_name}</h2>
          <p>{exhibition.exhibition_description}</p>
          <img src={exhibition.exhibition_image} alt={exhibition.exhibition_name} />
          {/* Display other exhibition information as needed */}
        </div>
      ))}
    </div>
  );
}

export default ExhibitionPage;