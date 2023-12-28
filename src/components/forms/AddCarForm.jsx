import React from 'react'

export default function AddCarForm() {
  return (
    <div>
        <div>
        <h2>Additional Car</h2>
        <p>Present A Car To Your Exhibition!</p>
        </div>

        <form>
        <label>Name of the Car:</label>
        <input type="text" name='car_name'></input>

        <label>Brand of the Car:</label>
        <input type="text" name='car_company'></input>

        <label>Model of the Car:</label>
        <input type="text" name='car_model'></input>

        <label>Assigned Price:</label>
        <input type="number" name='car_price'></input>

        <label>Car Description:</label>
        <input type="string" name='car_description'></input>

        
        <label>Image of the Car:</label>
        <input type="multer" name='car_avatar'></input>

        <div>
        <input type='submit' value="Add Car" className='btn btn-primary'></input>
    </div>
    </form>
    </div>
  )
}
