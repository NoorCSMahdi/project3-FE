import React from 'react'
import { Link } from 'react-router-dom'
import Review from '../review/Review'

export default function UserProfile() {
  // const showReview = () =>{
    // setReview(
    //   <Review review={user[currentIndex]}></Review>
    // )
  return (
    <div className='profilePage'>
      <div className=''>
        {/* Review List and Request form to be independent Showcaser */}
        <p className='profileReviewList'><Link to="/review/index">Reviews</Link></p>
      </div>


    </div>
  )
}
