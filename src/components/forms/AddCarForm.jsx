import React, { useState } from 'react';
import Axios from 'axios';

export default function AddCarForm(props) {
  const [newCar, setNewCar] = useState({});
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  
  const addCar = (car) => {
    const exhibitionId = props.exhibitionId; // Get the exhibition ID from props
    car.exhibitionId = exhibitionId; // Add the exhibition ID to the car object
    Axios.post('/car/add', {...car, Exhibition:exhibitionId},{
      headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTFhM2ZjOGY2MzliNTgyYmU5Njk0In0sImlhdCI6MTcwNDI3MDQyOCwiZXhwIjoxNzQwMjcwNDI4fQ.EO0M9cEZ4PXaVQrODdPBMdQumnhdZSzuA5BsXkvF4XE"
      }
    })
      .then((res) => {
        console.log('Car added successfully!');
        props.showForm(false)
      })
      .catch((err) => {
        console.log('Error adding car');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const exhibitionId = props.exhibitionId; // Get the exhibition ID from props
    newCar.exhibitionId = exhibitionId; // Add the exhibition ID to the newCar object
  
    const formData = new FormData();
    formData.append("car_avatar", file);
    formData.append("car_description", newCar.car_description);
    formData.append("car_price", newCar.car_price);
    formData.append("car_model", newCar.car_model);
    formData.append("car_company", newCar.car_company);
    formData.append("car_name", newCar.car_name);
    formData.append("Exhibition", exhibitionId);
  
    try {
      const result = await Axios.post('/car/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTFhM2ZjOGY2MzliNTgyYmU5Njk0In0sImlhdCI6MTcwNDI3MDQyOCwiZXhwIjoxNzQwMjcwNDI4fQ.EO0M9cEZ4PXaVQrODdPBMdQumnhdZSzuA5BsXkvF4XE"
        }
      });
  
      setImageName(result.data.imageName);
      console.log('Car added successfully!');
      props.showForm(false);
    } catch (error) {
      console.log('Error adding car:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Additional Car</h2>
        <p>Present A Car To Your Car!</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Hidden input field to store the exhibition ID */}
        <input type="hidden" name="exhibitionId" value={props.exhibitionId} />

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
            id="car_avatar"
            name="car_avatar"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleImage}
          />
        </div>

        <div className="mb-3">
          <input type="submit" value="Add Car" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}