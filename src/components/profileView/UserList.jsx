import React, { useEffect, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import Axios from 'axios';
// import UserProfile from "./UserProfile";

export default function UserList(props) {
    const [userList, setUserList] = useState([props.user]);
//   const [user, setUser]= useState(props.user);
  useEffect(() => {
    Axios.get('/user/index')
      .then(response => {
        console.log("res",response.data)
        setUserList(response.data.users);
        console.log(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const showUser = (id) =>{
    Axios.get(`/user/detail?=${id}`)
    .then((response) => {
      console.log(response)
      setUserList(response.data.userList)
  })
  .catch((err) => {
      console.log(err)
  })
  }
  const loadUserList = () => {
    Axios.get("/user/index")
    .then((response) => {
        console.log(response)
        setUserList(response.data.users)
    })
    .catch((err) => {
        console.log(err)
    })
  }
  const deleteUser = (id) =>{
    Axios.delete(`/user/delete?id=${id}`)
    .then(res =>{
        console.log("Record Deleted Successfully");
        console.log(res);
        loadUserList();
    })
    .catch(err =>{
        console.log("Error Deleting User");
        console.log(err);
    })
}

// const allUsers = userList.map((user, index)=>(
// <tr key={index}>
//   <UserProfile {...user} showUser={showUser} />
// </tr>  
// ))
  return (
    <div className="container">

      <h1 className="mt-5 mb-4">User List</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      {userList.map(userLists => (
          <div key={userLists._id} className="col mb-4">
            <div className="card">
              {/* <Link onClick={() => props.showUser(userLists._id)} user={userList} allUsers={allUsers} to={"/user/detail?="+userLists._id}> */}
                <img src={userLists.user_image} className="card-img-top" style={{ width: "100%", height: "auto", objectFit: "contain" }} alt={userLists.user_fullName} />
              {/* </Link> */}
              <div className="card-body">
                <h2 className="card-title">{userLists.user_fullName}</h2>
                <p className="card-text">{userLists.user_emailAddress}</p>
                <p className="card-text">{userLists.user_phoneNumber}</p>
                <p className="card-text">{userLists.userType}</p>
                {/* <h1>{userLists._id}</h1> */}
                <button className='btn btn-danger' onClick={() => deleteUser(userLists._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {/* {allUsers} */}
      </div>
    </div>
  )
}
