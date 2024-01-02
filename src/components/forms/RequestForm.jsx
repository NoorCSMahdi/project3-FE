import React, { useState } from 'react';
import Axios from 'axios';


export default function RequestForm() {
  const [newRequest, setNewRequest] = useState({
    request_exhibitionName: '',
    request_message: '',
    request_CR: '',
  });

  const addRequest = (request) => {
    Axios.post('/request/add', request)
      .then((res) => {
        console.log('Request added successfully!');
        // Handle success response, e.g., show a success message
      })
      .catch((error) => {
        console.log('Error adding request:', error);
        // Handle error response, e.g., show an error message
      });
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;


  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;


    setNewRequest((prevRequest) => ({
      ...prevRequest,
      [attributeToChange]: newValue,
    }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    addRequest(newRequest);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Request Form</h2>
        <p>Submit Your Request</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="request_exhibitionName" className="form-label">
            Exhibition Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="request_exhibitionName"
            name="request_exhibitionName"
            value={newRequest.request_exhibitionName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="request_message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="request_message"
            name="request_message"
            value={newRequest.request_message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="request_CR" className="form-label">
            CR:
          </label>
          <input
            type="text"
            className="form-control"
            id="request_CR"
            name="request_CR"
            value={newRequest.request_CR}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input type="submit" value="Submit Request" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
}