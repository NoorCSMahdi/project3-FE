import React, { useState } from 'react';
import Axios from 'axios';

export default function AddCarForm(props) {
  const [newCar, setNewCar] = useState({});

  const addCar = (car) => {
    Axios.post('car/add', car)
      .then((res) => {
        console.log('Car Added successfully!!!');
      })
      .catch((err) => {
        console.log('Error adding Car');
      });
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const car = { ...newCar };
    car[attributeToChange] = newValue;
    console.log(car);
    setNewCar(car);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCar(newCar);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Additional Car</h2>
        <p>Present A Car To Your Car!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="car_name" className="form-label">
            Name of the Car:
          </label>
          <input
            type="text"
            className="form-control"
            id="car_name"
            name="car_name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_company" className="form-label">
            Brand of the Car:
          </label>
          <input
            type="text"
            className="form-control"
            id="car_company"
            name="car_company"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_model" className="form-label">
            Model of the Car:
          </label>
          <input
            type="text"
            className="form-control"
            id="car_model"
            name="car_model"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_price" className="form-label">
            Assigned Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="car_price"
            name="car_price"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_description" className="form-label">
            Car Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="car_description"
            name="car_description"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_image" className="form-label">
            Image of the Car:
          </label>
          <input
            type="file"
            className="form-control"
            id="car_image"
            name="car_image"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input type="submit" value="Add Car" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}