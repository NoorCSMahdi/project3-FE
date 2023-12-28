import React from 'react'

export default function AddExhibitionForm() {
  return (
    <div>
    <div>
    <h2>Create Your Exhibition</h2>
    <p>A Chance To Display Your Exhibition!</p>
    </div>

    <form>
    <label>Exhibition Name:</label>
    <input type="text" name='car_name'></input>

    <label>Description of the Exhibition:</label>
    <input type="text" name='car_company'></input>

    <label>Business' Contacts:</label>
    <input type="number" name='exhibition_phoneNumber'></input>

    <label>Business Email-Address:</label>
    <input type="email" name='exhibition_emailAddress'></input>

    <label>Exhibition Location:</label>
    <input type="text" name='exhibition_location'></input>

    <label>Upload Exhibition Images:</label>
    <input type="file" name="exhibition_image" accept=".png, .jpg, .jpeg, .gif"></input>
  

    <div>
    <input type='submit' value="Create Exhibition" className='btn btn-primary'></input>
</div>
</form>
</div>
  )
}
