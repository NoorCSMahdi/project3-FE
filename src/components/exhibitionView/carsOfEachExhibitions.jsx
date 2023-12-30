import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExhibitionCarsPage({ exhibitionId }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch cars for the specific exhibition
    axios
      .get(`/api/exhibitions/${exhibitionId}/cars`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, [exhibitionId]);

  return (
    <div>
      <h1>Cars for Exhibition</h1>
      {cars.map(car => (
        <div key={car._id}>
          <h2>{car.car_name}</h2>
          <p>{car.car_description}</p>
          <p>Company: {car.car_company}</p>
          <p>Model: {car.car_model}</p>
          <p>Price: {car.car_price}</p>
          <img src={car.car_avatar} alt={car.car_name} />
          {/* Display other car information as needed */}
        </div>
      ))}
    </div>
  );
}

export default ExhibitionCarsPage;