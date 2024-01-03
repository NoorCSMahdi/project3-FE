import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';

function ExhibitionCarsPage( ) {
  const [cars, setCars] = useState([]);
  const [exhibition, setExhibition] = useState([]);
  const { id: exhibitionId } = useParams(); // Get the exhibitionId from the URL parameter

  useEffect(() => {
    // Fetch cars for the specific exhibition
    axios
      .get(`/exhibition/detail?id=${exhibitionId}`)
      .then(response => {
        console.log(response);
        setCars(response.data.exhibition?response.data.exhibition.Car:[]);
        setExhibition(response.data.exhibition?response.data.exhibition:[]);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, [exhibitionId]);

  return (


<div>
  <div className="d-flex justify-content-end mb-3">
    <Link to="/AddCarForm" className="btn btn-secondary">Add Car</Link>
  </div>
  <h1>Cars for Exhibition</h1>
  {exhibitionId}
  {cars.map(car => (
    <div key={car._id}> {/* Use "car" instead of "cars" */}
      <h2>{car.car_name}</h2> {/* Use "car" instead of "cars" */}
      <p>{car.car_description}</p> {/* Use "car" instead of "cars" */}
      <p>Company: {car.car_company}</p> {/* Use "car" instead of "cars" */}
      <p>Model: {car.car_model}</p> {/* Use "car" instead of "cars" */}
      <p>Price: {car.car_price}</p> {/* Use "car" instead of "cars" */}
      <img src={car.car_avatar} alt={car.car_name} /> {/* Use "car" instead of "cars" */}
      {/* Display other car information as needed */}
    </div>
  ))}
</div>
  );
}

export default ExhibitionCarsPage;