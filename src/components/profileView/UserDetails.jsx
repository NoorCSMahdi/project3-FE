import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Review from '../review/Review'
import Axios from 'axios';
import EditProfile from './EditProfile';
// import FetchUserInfo from './FetchUserInfo'

export default function UserDetails(props) {
  const navigate = useNavigate();

  console.log(props);
  const [user, setUser] = useState({})
  const [isEdit,setIsEdit]=useState(false)

  useEffect(()=>{
    console.log("useEffect user", props.user );
    if(!props.user.id) return
      Axios.get(`/user/detail?id=${props.user.id}`)
      .then((response) => {
        console.log("response",response.data)
        setUser(response.data.user)
    })
    .catch((err) => {
        console.log(err)
    })
  },[props.user.id])

  const handleEditUser = (id) => {
    setIsEdit(!isEdit)
    // navigate(`/user/edit/${id}`);
  };

  const EditUpdate = (user)=>{
    Axios.put("/user/update",user)
    .then((res)=>{
        console.log("User Updated successfully")
    })
    .catch((err)=>{
     console.log(err)
    })

  }
  return (
    <>
    {/* <FetchUserInfo id={props.id}/> */}
    {/* <div>{props.id}</div> */}
    {user && 
    <>
    <div><img className='profileImg' src={user.user_image} alt={user.user_fullName}/></div>
    <div><span className='profileSpan'>Full Name: </span>{user.user_fullName}</div>
    <div><span className='profileSpan'>Phone Number: </span>{user.user_phoneNumber}</div>
    <div><span className='profileSpan'>Email Address: </span>{user.user_emailAddress}</div>
    {/* <div>{user.user_password}</div> */}
    <br/>
    <div><button className='btn btn-secondary' onClick={() => handleEditUser(user.id)}>Edit</button></div>
    {/* <div><button onClick={() => props.deleteUser(props._id)}>Delete</button></div> */}
    </>
  }
  {isEdit && <EditProfile id={user.id} user={user} EditUpdate={EditUpdate} />}
    </>
  


    
  )
}
