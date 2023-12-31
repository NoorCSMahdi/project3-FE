import React, { useState } from 'react'

export default function AddCarForm(props) {
  const [newCar, setNewCar]= useState({});

    const handleChange= (event)=>{
        const attributeToChange = event.target.name;
        const newValue = event.target.value;

        const car = {...newCar}
        car[attributeToChange] = newValue;
        console.log(car);
        setNewCar(car);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addCar(newCar);
    }

  return (
    <div>
        <div>
        <h2>Additional Car</h2>
        <p>Present A Car To Your Exhibition!</p>
        </div>

        <form onSubmit={handleSubmit}>
        <label>Name of the Car:</label>
        <input type="text" name='car_name' onChange={handleChange}></input>

        <label>Brand of the Car:</label>
        <input type="text" name='car_company' onChange={handleChange}></input>

        <label>Model of the Car:</label>
        <input type="text" name='car_model' onChange={handleChange}></input>

        <label>Type of Car</label>
        

        <label>Assigned Price:</label>
        <input type="number" name='car_price' onChange={handleChange}></input>

        <label>Car Description:</label>
        <input type="string" name='car_description' onChange={handleChange}></input>

        
        <label>Image of the Car:</label>
        <input type="file" name="exhibition_image" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange}></input>

        <div>
        <input type='submit' value="Add Car" className='btn btn-primary'></input>
    </div>
    </form>
    </div>
  )
}
