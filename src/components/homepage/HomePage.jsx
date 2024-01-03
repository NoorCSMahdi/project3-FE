import React from 'react'
import {Link} from 'react-router-dom'

export default function HomePage() {
  return (
    <>
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary carBackground">
      
    <div className="col-md-6 p-lg-5 mx-auto my-5">

      <h1 className="display-3 fw-bold title">Voiture</h1>
      <h3 className="fw-normal text-muted mb-3 titlep">Hit The Road With Perfection</h3>
      <div className="d-flex gap-3 justify-content-center lead fw-normal">
        <Link className="homepage" to="/exhibition/index">Exhibitions </Link>
      </div>

    </div>

    </div>  

      {/* <div className="album py-5 bg-body-tertiary">
        <div className='container'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            <div className='col'>
            <div className="card shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
