import React, { useState, useRef } from 'react';
import Axios from 'axios';

// Google Maps Places Autocomplete API script
// const googleMapsScript = document.createElement('script');
// googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
// googleMapsScript.async = true;
// document.head.appendChild(googleMapsScript);

export default function AddExhibitionForm(props) {
  const [newExhibition, setNewExhibition] = useState({});
  const autocompleteRef = useRef(null);
  const [file, setFile] = useState()
  const [imageName, setImageName] = useState()


  const addExhibition = (exhibition) => {
    Axios.post('exhibition/add', exhibition)
      .then((res) => {
        console.log('Exhibition Added successfully!!!');
      })
      .catch((err) => {
        console.log('Error adding Exhibition');
      });
  };

  const handleImage = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const exhibition = { ...newExhibition };
    exhibition[attributeToChange] = newValue;
    setNewExhibition(exhibition);
    console.log(newExhibition);
  };

  // const handleMapPlaceChange = () => {
  //   const place = autocompleteRef.current.getPlace();
  //   if (place && place.geometry) {
  //     const exhibition = { ...newExhibition };
  //     exhibition.exhibition_location = place.formatted_address;
  //     exhibition.exhibition_lat = place.geometry.location.lat();
  //     exhibition.exhibition_lng = place.geometry.location.lng();
  //     setNewExhibition(exhibition);
  //     console.log(newExhibition);
  //   }
  // };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("exhibition_image", file)
    formData.append("exhibition_name", newExhibition.exhibition_name)
    formData.append("exhibition_description", newExhibition.exhibition_description)
    formData.append("exhibition_phoneNumber", newExhibition.exhibition_phoneNumber)
    formData.append("exhibition_emailAddress", newExhibition.exhibition_emailAddress)
    formData.append("exhibition_location", newExhibition.exhibition_location)
    formData.append("working_days", newExhibition.working_days)
    
  const result = await Axios.post('/exhibition/add', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    setImageName(result.data.imageName)
    // addExhibition(newExhibition);
  };


  return (
    <div className="container">
      <div className="mb-4">
        <h2>Create Your Exhibition</h2>
        <p>A Chance To Display Your Exhibition!</p>
      </div>

      <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exhibition_name" className="form-label">
        Exhibition Name:
      </label>
      <input required
        type="text"
        className="form-control"
        id="exhibition_name"
        name="exhibition_name"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exhibition_description" className="form-label">
        Description of the Exhibition:
      </label>
      <input required
        type="text"
        className="form-control"
        id="exhibition_description"
        name="exhibition_description"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exhibition_phoneNumber" className="form-label">
        Business' Contacts:
      </label>
      <input required
        type="text"
        className="form-control"
        id="exhibition_phoneNumber"
        name="exhibition_phoneNumber"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exhibition_emailAddress" className="form-label">
        Business Email-Address:
      </label>
      <input required
        type="email"
        className="form-control"
        id="exhibition_emailAddress"
        name="exhibition_emailAddress"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exhibition_location" className="form-label">
        Exhibition Location:
      </label>
      <input required
        type="text"
        className="form-control"
        id="exhibition_location"
        name="exhibition_location"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exhibition_image" className="form-label">
        Upload Exhibition Images:
      </label>
      <input required
        type="file"
        className="form-control"
        id="exhibition_image"
        name="exhibition_image"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={handleImage}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="working_days" className="form-label">
        Working Days:
      </label>
      <input required
        type="date"
        className="form-control"
        id="working_days"
        name="working_days"
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <input type="submit" value="Create Exhibition" className="btn btn-primary" />
    </div>
  </form>
</div>
      
  );
}