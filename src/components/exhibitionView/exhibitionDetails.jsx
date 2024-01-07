import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import Map from '../forms/Map';
import AddExhibitionForm from '../forms/AddExhibitionForm';

export default function ExhibitionDetailPage(props) {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [exhibition, setExhibition] = useState({
    exhibition_latitude:0,
    exhibition_longtude:0
  });
  const { id: exhibitionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cars for the specific exhibition
    Axios
      .get(`/exhibition/detail?id=${exhibitionId}`)
      .then(response => {
        console.log(response);
        let lat = parseFloat(response.data.exhibition.exhibition_latitude);
        let long = parseFloat(response.data.exhibition.exhibition_longtude);
        if(isNaN(lat)){
          lat = 0;
        }
        if(isNaN(long)){
          long = 0;
        }
        response.data.exhibition.exhibition_latitude = lat;
        response.data.exhibition.exhibition_longtude = long;
        setExhibition(response.data.exhibition ? response.data.exhibition : []);
      })
      .catch(error => {
        console.error('Error fetching exhibition:', error);
      });
  }, [exhibitionId]);
  
  console.log("///", exhibitionData);
  // Function to handle form input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setExhibitionData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // Function to handle form submission
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Perform any additional actions on form submission
  

  return (
    // <div className="container">
    //   <div className="mb-4">
    //     <h2>Exhibition Details</h2>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_name" className="form-label">
    //       Exhibition Name:
    //     </label>
    //     <p>{exhibitionData.exhibition_name}</p>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_description" className="form-label">
    //       Description of the Exhibition:
    //     </label>
    //     <p>{exhibitionData.exhibition_description}</p>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_phoneNumber" className="form-label">
    //       Business' Contacts:
    //     </label>
    //     <p>{exhibitionData.exhibition_phoneNumber}</p>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_emailAddress" className="form-label">
    //       Business Email-Address:
    //     </label>
    //     <p>{exhibitionData.exhibition_emailAddress}</p>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_image" className="form-label">
    //       Exhibition Image:
    //     </label>
    //     <img src={exhibitionData.exhibition_image} alt="Exhibition" />
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="working_days" className="form-label">
    //       Working Days:
    //     </label>
    //     <p>{exhibitionData.working_days}</p>
    //   </div>

    //   <div className="mb-3">
    //     <label htmlFor="exhibition_location" className="form-label">
    //       Exhibition Location:
    //     </label>
    //     <Map>
    //     <p>{exhibitionData.exhibition_location}</p>
    //     </Map>
    //   </div>
<>
      <h1 className="mt-5 mb-4">Exhibition Details</h1>

          <div key={exhibition._id} className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">Exhibition Name: {exhibition.exhibition_name}</h2>
              <img src={exhibition.exhibition_image} alt={exhibition.exhibition_name} className="card-img-top" style={{ width: "50vw", height: "100%", objectFit: "cover" }} />
              <p className="card-text">Exhibition Description: {exhibition.exhibition_description}</p>
              <p className="card-text">Business Email-Address: {exhibition.exhibition_emailAddress}</p>
              <p className="card-text">Business Contacts: {exhibition.exhibition_phoneNumber}</p>
              <p className="card-text">Exhibition Location: {exhibition.exhibition_latitude}</p>
              <Map destination={[exhibition.exhibition_latitude, exhibition.exhibition_longtude]}></Map>
             </div>
             
    </div>
        
        

      
        
      </>

  )


        
}