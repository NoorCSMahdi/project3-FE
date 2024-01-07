import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import Axios from 'axios';
import RequestForm from '../forms/RequestForm';

function ExhibitionPage(props) {
  const [exhibitions, setExhibitions] = useState([]);
  const [user, setUser]= useState(props.user);
  useEffect(() => {
    // Fetch exhibitions from the API
    Axios.get('/exhibition/index')
      .then(response => {
        setExhibitions(response.data.exhibitions);
      })
      .catch(error => {
        console.error('Error fetching exhibitions:', error);
      });
  }, []);

  return (
    <div className="container">

    {props.user && (props.user.userType=="User") ?<div className="d-flex justify-content-end">
    <Link to="/request/add" className="btn btn-secondary mt-3" element={<RequestForm user={user}></RequestForm>} >Exhibition Owner Request Form</Link>
  </div>:""}
 
      <h1 className="mt-5 mb-4">Exhibitions</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        {exhibitions.map(exhibition => (
          <div key={exhibition._id} className="col mb-4">
            <div className="card">
              <Link to={"/exhibition/cars/"+exhibition._id}>
                <img src={exhibition.exhibition_image} className="card-img-top" style={{ width: "100%", height: "150px", objectFit: "cover" }} alt={exhibition.exhibition_name} />
              </Link>
              <div className="card-body">
                <h2 className="card-title">{exhibition.exhibition_name}</h2>
                <p className="card-text">{exhibition.exhibition_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExhibitionPage;