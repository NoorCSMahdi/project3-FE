import React from 'react'
import { Link } from 'react-router-dom'

export default function UserProfile() {
  return (
    <div className='profilePage'>
      <div className=''>
        {/* Review List and Request form to be independent Showcaser */}
        <p className='profileReviewList'><Link to="/review/index">Reviews</Link></p>
      </div>


    </div>
  )
}
