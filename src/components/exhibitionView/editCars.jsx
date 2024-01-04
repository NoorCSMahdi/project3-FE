import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function EditCarForm(props) {
  const [carData, setCarData] = useState(props.car);
  const [updatedCar, setUpdatedCar] = useState({
      car_name: '',
      car_company: '',
      car_model: '',
      car_price: '',
      car_description: '',
      car_avatar: '',
  });

  useEffect(() => {
  //   setCarData(props.car);
   setUpdatedCar(props.car);
 }, [props.car]);

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const updatedCarData = {...updatedCar};
    updatedCarData[attributeToChange] = newValue;
    console.log(updatedCarData);
    setUpdatedCar(updatedCarData);
    
  };

  const updateCar = (res) => {
    const carId = res.query.id; // Get the car ID from props
    Axios.post(`/car/update/${carId}`, updatedCar, {
      headers: {
        Authorization: "Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTFhM2ZjOGY2MzliNTgyYmU5Njk0In0sImlhdCI6MTcwNDI3MDQyOCwiZXhwIjoxNzQwMjcwNDI4fQ.EO0M9cEZ4PXaVQrODdPBMdQumnhdZSzuA5BsXkvF4XE",
      },
    })
      .then((res) => {
        console.log('Car updated successfully!');
        props.history.push('/cars'); // Redirect to cars listing page
      })
      .catch((err) => {
        console.log('Error updating car');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatedCarData(props.updatedCarData);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Edit Car</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="car_name" className="form-label">
            Name of the Car:
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="car_name"
            name="car_name"
            value={updateCar.car_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_company" className="form-label">
            Brand of the Car:
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="car_company"
            name="car_company"
            value={updateCar.car_company}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_model" className="form-label">
            Model of the Car:
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="car_model"
            name="car_model"
            value={updateCar.car_model}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_price" className="form-label">
            Assigned Price:
          </label>
          <input
            required
            type="number"
            className="form-control"
            id="car_price"
            name="car_price"
            value={updateCar.car_price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_description" className="form-label">
            Car Description:
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="car_description"
            name="car_description"
            value={updateCar.car_description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="car_image" className="form-label">
            Image of the Car:
          </label>
          <input
            required
            type="file"
            className="form-control"
            id="car_image"
            name="car_image"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input type="submit" value="Update Car" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}