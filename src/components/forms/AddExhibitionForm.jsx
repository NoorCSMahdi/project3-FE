import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function AddExhibitionForm(props) {
  const [newExhibition, setNewExhibition] = useState({});
  const [destination, setDestination] = useState(null);
  const autocompleteRef = useRef(null);

  const addExhibition = (exhibition) => {
    Axios.post('exhibition/add', exhibition)
      .then((res) => {
        console.log('Exhibition Added successfully!!!');
      })
      .catch((err) => {
        console.log('Error adding Exhibition');
      });
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const exhibition = { ...newExhibition };
    exhibition[attributeToChange] = newValue;
    setNewExhibition(exhibition);
    console.log(newExhibition);
  };

  const handleMapClick = (e) => {
    setDestination(e.latlng);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDestination({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addExhibition(newExhibition);
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
          <input
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
          <input
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
          <input
            type="number"
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
          <input
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
          <MapContainer
            center={destination || [latitude, longitude]} // Replace latitude and longitude with the appropriate values
            zoom={13}
            style={{ height: '400px' }}
            onClick={handleMapClick}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {destination && <Marker position={destination}></Marker>}
          </MapContainer>
          <button onClick={fetchCurrentLocation}>Get Current Location</button>
        </div>

        <div className="mb-3">
          <label htmlFor="exhibition_image" className="form-label">
            Upload Exhibition Images:
          </label>
          <input
            type="file"
            className="form-control"
            id="exhibition_image"
            name="exhibition_image"
            accept=".png, .jpg, .jpeg, .gif"
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