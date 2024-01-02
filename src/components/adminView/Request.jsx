import React from 'react'

export default function Request(props) {
 return (
    <>
    <td>{props.User.user_fullName}</td>
    <td>{props.request_exhibitionName}</td>
    <td>{props.request_message}</td>
    <td>{props.request_CR}</td>
    <td><button onClick={()=> props.approveRequest(props._id)}>Approve</button></td>
    <td><button onClick={()=> props.deleteRequest(props._id)}>Decline</button></td>
    </>
   )
 }
