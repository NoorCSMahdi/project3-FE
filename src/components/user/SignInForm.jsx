import React, { useState } from 'react'

export default function SignInForm(props) {

    const [newUser, setNewUser] = useState({});

    const handleChange = (event) => {
        const user = {...newUser};
        user[event.target.name] = event.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = (e) => {
        e.preventDefault();
        props.login(newUser);
        e.target.reset();
    }

  return (
    <div>
         <h1>Sign-In</h1>

<form onSubmit={loginHandler}>
    <div>
        <label>Email Address</label>
        <input type='email' name='user_emailAddress' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
        <label>Password</label>
        <input type='password' name='user_password' onChange={handleChange} className='form-control'></input>
    </div>

    <div>
        <input type='submit' value='Login' className='btn btn-primary'></input>
    </div>
</form>

    </div>
  )
}
