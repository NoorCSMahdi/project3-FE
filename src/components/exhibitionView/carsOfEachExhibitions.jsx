import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import AddCarForm from '../forms/AddCarForm';
import Delete from './Delete';

function ExhibitionCarsPage(props) {
  const [cars, setCars] = useState([]);
  const [addCar, setAddCar] = useState(false);
  const [exhibition, setExhibition] = useState([]);
  const { id: exhibitionId } = useParams(); // Get the exhibitionId from the URL parameter
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cars for the specific exhibition
    axios
      .get(`/exhibition/detail?id=${exhibitionId}`)
      .then(response => {
        console.log(response);
        setCars(response.data.exhibition ? response.data.exhibition.Car : []);
        setExhibition(response.data.exhibition ? response.data.exhibition : []);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, [exhibitionId, addCar]);

  const handleDeleteCar = (carId) => {
    console.log(props.setHeaders());
    axios
      .get(`/car/delete?id=${carId}`, props.setHeaders())
      .then(response => {
        console.log(response);
        // Remove the deleted car from the cars state
        setCars(prevCars => prevCars.filter(car => car._id !== carId));
      })
      .catch(error => {
        console.error('Error deleting car:', error);
      });
  };

  const handleEditCar = (carId) => {
    navigate(`/car/edit/${carId}`);
  };

  const deleteExhibition=(id)=>{
    axios.delete(`/exhibition/delete?id=${id}`)
    .then(res=>{
      console.log("exhibition deleted");
      console.log(res);
      navigate('/')
    })
    .catch(err=>{
      console.log("error deleting exhibition",err);
    })
  }

  return (
    <div className="container">
       <div className="d-flex justify-content-start mb-3">
        <button onClick={()=>deleteExhibition(exhibitionId)}>Delete Exibition</button>
        <Link to={'/exhibition/detail/'+exhibitionId} className="btn btn-secondary">Exhibition Details</Link>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Link onClick={() => setAddCar(true)} className="btn btn-secondary">Add Car</Link>
      </div>
      <h1 className="mt-5 mb-4">Cars for Exhibition</h1>
      {addCar ? (
        <AddCarForm exhibitionId={exhibitionId} showForm={setAddCar} />
      ) : (
        cars.map(car => (
          <div key={car._id} className="card mb-3 d-inline-flex" style={{ width: "45%", height: "auto", marginLeft: "10px", marginRight: "10px"}}>
            <div className="card-body">
              <h2 className="card-title">{car.car_name}</h2>
              <p className="card-text">{car.car_description}</p>
              <p className="card-text">Company: {car.car_company}</p>
              <p className="card-text">Model: {car.car_model}</p>
              <p className="card-text">Price: {car.car_price}</p>
              <img src={car.car_avatar} alt={car.car_name} className="card-img-top" style={{ width: "70%", height: "auto", objectFit: "contain" , padding: 10}} />
              {props.user && (props.user.userType=="Admin"||props.user.userType=="SubAdmin")?<Delete delete={handleDeleteCar} car={car} />:""}
              {/* <button className="btn btn-danger" onClick={() => handleDeleteCar(car._id)}>Delete</button> */}
              {props.user && (props.user.userType=="Admin"||props.user.userType=="SubAdmin")?<button className="btn btn-primary" style={{marginLeft: 5}} onClick={() => handleEditCar(car._id)}>Edit</button>:""}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExhibitionCarsPage;