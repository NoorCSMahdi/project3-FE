import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import AddCarForm from '../forms/AddCarForm';

function ExhibitionCarsPage(props) {
  const [cars, setCars] = useState([]);
  const [addCar, setAddCar] = useState(false)
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
  }, [exhibitionId, addCar]);
  console.log("--", props.user);
  const admin = () => {
    console.log("--", props.user);
    if(props.user.userType == "Admin" || props.user.userType == "SubAdmin"){
      return true
    }
  };

  return (
<div className="container">
  {admin ?
  <div className="d-flex justify-content-end mb-3">
    <Link onClick={() => setAddCar(true)} className="btn btn-secondary">Add Car</Link>
  </div>
  : <></> }
  <h1 className="mt-5 mb-4">Cars for Exhibition</h1>
  {addCar ? (
    <AddCarForm exhibitionId={exhibitionId} showForm={setAddCar} />
  ) : (
    cars.map(car => (
      <div key={car._id} className="card mb-3">
        <div className="card-body">
          <h2 className="card-title">{car.car_name}</h2>
          <p className="card-text">{car.car_description}</p>
          <p className="card-text">Company: {car.car_company}</p>
          <p className="card-text">Model: {car.car_model}</p>
          <p className="card-text">Price: {car.car_price}</p>
          <img src={car.car_avatar} alt={car.car_name} className="card-img-top" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
      </div>
    ))
  )}

</div>
  );
}

export default ExhibitionCarsPage;