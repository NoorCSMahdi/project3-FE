import React from 'react'
import { Link } from 'react-router-dom'
import Review from '../review/Review'
import Axios from 'axios';
// import FetchUserInfo from './FetchUserInfo'

export default function UserProfile(props) {
  console.log(props);
  return (
    <>
    {/* <FetchUserInfo id={props.id}/> */}
    <td>{props.id}</td>
    <td>{props.user_phoneNumber}</td>
    <td>{props.user_emailAddress}</td>
    {/* <td>{props.user_password}</td> */}
    <td>{props.user_image}</td>
    <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
    <td><button onClick={() => props.deleteUser(props._id)}>Delete</button></td>
    </>
    // <div className='profilePage'>
    //   <div className=''>
    //     {/* Review List and Request form to be independent Showcaser */}
    //     <p className='profileReviewList'><Link to="/review/index">Reviews</Link></p>
    //   </div>


    // </div>
  )
}
