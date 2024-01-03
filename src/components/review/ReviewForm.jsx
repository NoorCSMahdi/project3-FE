import React, { useState } from 'react';
import Axios from 'axios';


export default function ReviewForm(props) {
  const [user, setUser]= useState(props.user);
//   const [exhibition, setExhibition]= useState(props.exhibition);

  console.log(props)

  const [newReview, setNewReview] = useState({
    review_title: '',
    review_content: ''
  });

  const addReview = (review) => {
    Axios.post('/review/add', review)
      .then((res) => {
        console.log('Review added successfully!');
        // Handle success response, e.g., show a success message
      })
      .catch((error) => {
        console.log('Error adding review:', error);
        // Handle error response, e.g., show an error message
      });
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;


    setNewReview((prevReview) => ({
      ...prevReview,
      [attributeToChange]: newValue,
      "User": user.id
    }));


    console.log(newReview)
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    addReview(newReview);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Review Form</h2>
        <p>Submit Your Review</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="review_title" className="form-label">
          Review Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="review_title"
            name="review_title"
            value={newReview.review_title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="review_content" className="form-label">
          Review Content:
          </label>
          <textarea
            className="form-control"
            id="review_content"
            name="review_content"
            value={newReview.review_content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <input type="submit" value="Submit Review" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
