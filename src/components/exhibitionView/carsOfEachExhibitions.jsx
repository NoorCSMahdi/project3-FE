import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExhibitionCarsPage({ exhibitionId }) {
  const [cars, setCars] = useState([]);
exhibitionId="65915f0f35e4ce658ac13cff"
  useEffect(() => {
    // Fetch cars for the specific exhibition
    axios
      .get(`/exhibition/detail?id=${exhibitionId}`)
      .then(response => {
        console.log(response);
        setCars(response.data.exhibition);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, [exhibitionId]);

  return (
    <div>
      <h1>Cars for Exhibition</h1>
      {exhibitionId}
      {/* {cars.map(car => ( */}
        {/* <div key={cars._id}> */}
          {/* <h2>{cars.car_name}</h2>
          <p>{cars.car_description}</p>
          <p>Company: {cars.car_company}</p>
          <p>Model: {cars.car_model}</p>
          <p>Price: {cars.car_price}</p>
          <img src={cars.car_avatar} alt={cars.car_name} /> */}
          {/* Display other car information as needed */}
        {/* </div> */}
      {/* ))} */}
    </div>
  );
}

export default ExhibitionCarsPage;