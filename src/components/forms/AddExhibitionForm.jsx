import React, { useState } from 'react'

export default function AddExhibitionForm(props) {
  const [newExhibition, setNewExhibition]= useState({});

  const handleChange= (event)=>{
      const attributeToChange = event.target.name;
      const newValue = event.target.value;

      const exhibition = {...newExhibition}
      exhibition[attributeToChange] = newValue;
      console.log(exhibition);
      setNewExhibition(exhibition);

  }

  const handleSubmit = (event) => {
      event.preventDefault();
      props.addExhibition(newExhibition);
  }

  return (
    <div>
    <div>
    <h2>Create Your Exhibition</h2>
    <p>A Chance To Display Your Exhibition!</p>
    </div>

    <form onSubmit={handleSubmit}>
    <label>Exhibition Name:</label>
    <input type="text" name='car_name' onChange={handleChange}></input>

    <label>Description of the Exhibition:</label>
    <input type="text" name='car_company' onChange={handleChange}></input>

    <label>Business' Contacts:</label>
    <input type="number" name='exhibition_phoneNumber' onChange={handleChange}></input>

    <label>Business Email-Address:</label>
    <input type="email" name='exhibition_emailAddress' onChange={handleChange}></input>

    <label>Exhibition Location:</label>
    <input type="text" name='exhibition_location' onChange={handleChange}></input>

    <label>Upload Exhibition Images:</label>
    <input type="file" name="exhibition_image" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange}></input>
  

    <div>
    <input type='submit' value="Create Exhibition" className='btn btn-primary'></input>
</div>
</form>
</div>
  )
}
