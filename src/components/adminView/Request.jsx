import React from 'react'

export default function Request(props) {
 return (
    <>
    <td>{props.request_exhibitionName}</td>
    <td>{props.request_message}</td>
    <td>{props.request_CR}</td>
    <td><button onClick={()=> props.editView(props._id)}>Edit</button></td>
    <td><button onClick={()=> props.deleteRequest(props._id)}>Delete</button></td>
    </>
   )
 }
