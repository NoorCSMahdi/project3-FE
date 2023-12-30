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
    <div>
         <h1>Sign-Up</h1>

<form onSubmit={registerHandler}>
    <div>
        <label>Full Name</label>
        <input type='text' name='user_fullName' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
        <label>Phone Number</label>
        <input type='text' name='user_phoneNumber' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
        <label>Email Address</label>
        <input type='email' name='user_emailAddress' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
        <label>Password</label>
        <input type='password' name='user_password' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
    <label>Profile Picture:</label>
        <input type="file" name="user_image" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange}></input>
    </div>
    
    <div>
        <input type='submit' value='Register' className='btn btn-primary'></input>
    </div>
</form>

    </div>
  )
}
