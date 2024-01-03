import React, { useState } from "react";

export default function Delete(props) {
  const [showModal, setShowModal]=useState(false)
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={`#${props.car._id}`}
        onClick={()=>setShowModal(true)}
      >Delete
      </button>
{showModal && 
      <div
        className="modal fade show"
        id={props.car._id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{display: "block"}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure to delete the car?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">If you click on Delete the car will be deleted</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>setShowModal(false)}
              >
                Close
              </button>
              <button type="button" onClick={()=>{
                setShowModal(false)
                props.delete(props.car._id)
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
