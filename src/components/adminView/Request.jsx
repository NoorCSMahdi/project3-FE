import React from 'react'

export default function Request(props) {

 return (
    <>
    <td>{ props.User.user_fullName}</td>
    <td>{props.request_exhibitionName}</td>
    <td>{props.request_message}</td>
    <td>{props.request_CR}</td>
    <td><button className="btn btn-outline-success" onClick={()=> props.changeUserType(props.User._id)}>Approve</button></td>
    <td><button className="btn btn-outline-danger" onClick={()=> props.deleteRequest(props._id)}>Decline</button></td>
    <td><button className="btn btn-outline-dark" onClick={()=> props.deleteRequest(props._id)}>Done</button></td>
    </>
   )
 }
