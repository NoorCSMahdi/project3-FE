import React, { useState, useRef } from 'react';
import Axios from 'axios';
import Map from './Map';

export default function AddExhibitionForm(props) {
  const [newExhibition, setNewExhibition] = useState({});
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState(null);
  const autocompleteRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState(null);

  const successCallback = (position) => {
    console.log("coor",position.coords);
    const newLocation = {
      latitude:position.coords.latitude,
      longitude: position.coords.longitude
    }
    setLocation(newLocation)
    console.log("newLocation", newLocation)
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  // Move this line inside the component body
  // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

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
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const exhibition = { ...newExhibition };
    exhibition[attributeToChange] = newValue;
    setNewExhibition(exhibition);
    console.log(exhibition);
  };

  const handleMapClick = (e) => {
    console.log(e);
    setDestination(e.latlng);
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDestination({ lat: latitude, lng: longitude });
          console.log(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("exhibition_image", file);
    formData.append("exhibition_name", newExhibition.exhibition_name);
    formData.append("exhibition_description", newExhibition.exhibition_description);
    formData.append("exhibition_phoneNumber", newExhibition.exhibition_phoneNumber);
    formData.append("exhibition_emailAddress", newExhibition.exhibition_emailAddress);
    formData.append("exhibition_latitude", destination.lat);
    formData.append("exhibition_longtude", destination.lng);
    // console.log("newExhibition.exhibition_location", location)
    formData.append("working_days", newExhibition.working_days);

    console.log(formData)
    
    try {
      const result = await Axios.post('/exhibition/add', formData, { headers: {'Content-Type': 'multipart/form-data'}});
      setImageName(result.data.imageName);
      console.log('Exhibition Added successfully!!!');
    } catch (error) {
      console.log('Error adding Exhibition:', error);
    }
    event.target.reset();
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
    </div><div className="mb-3">
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
          <label htmlFor="exhibition_location" className="form-label">
            Exhibition Location:
          </label>
          <Map destination={destination} key={destination&& destination.lat || 2}/>
          
          <button type="button" onClick={fetchCurrentLocation}>Get Current Location</button>
        </div>

        {/* Rest of the form fields */}

        <div className="mb-3">
          <input type="submit" value="Create Exhibition" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}