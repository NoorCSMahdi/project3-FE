import React, { useState } from 'react'

export default function SignUpForm(props) {

    const [newUser, setNewUser] = useState({});

    const handleChange = (event) => {
        const user = {...newUser};
        user[event.target.name] = event.target.value;
        console.log(user);
        setNewUser(user);
    }

    const registerHandler = (e) => {
        e.preventDefault();
        props.register(newUser);
        e.target.reset();
    }

  return (
    <div className="mx-auto p-5 d-flex justify-content-center">
  <div className="col-md-6">
    <h1 className="text-center mb-4">Sign-Up</h1>

    <form onSubmit={registerHandler}>
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="user_fullName" onChange={handleChange} className="form-control" />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" name="user_phoneNumber" onChange={handleChange} className="form-control" />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input type="email" name="user_emailAddress" onChange={handleChange} className="form-control" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="user_password" onChange={handleChange} className="form-control" style={{marginBottom: 10}}/>
      </div>

      <div className="form-group">
        <label>Profile Picture:</label>
        <input type="file" name="user_image" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange} style={{marginLeft: 10}}/>
      </div>

      <div className="text-center">
        <input type="submit" value="Register" className="btn btn-secondary btn-lg" style={{marginTop: 10}} />
      </div>
    </form>
  </div>
</div>
  )
}
