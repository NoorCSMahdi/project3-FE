import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function EditProfile(props) {
  const [user, setUser] = useState(props.user);
  const [file, setFile] = useState(null);

  useEffect(() => {
    Axios.get(`/user/edit?id=${props.user._id}`)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [props.user._id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const EditUpdate = async (user) => {
    try {
      await Axios.put("/user/update", user);
      console.log("User Updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  
  const submitChange = async (e) => {
    e.preventDefault();
    await props.EditUpdate(user);
    e.target.reset();
  };
  

  return (
    <div className="mx-auto p-5 d-flex justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Edit User</h1>

        <form onSubmit={submitChange}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="user_fullName"
              required
              onChange={handleChange}
              className="form-control"
              value={user.user_fullName || ''}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="user_phoneNumber"
              required
              onChange={handleChange}
              className="form-control"
              value={user.user_phoneNumber || ''}
            />
          </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="user_password" required onChange={handleChange} className="form-control" style={{marginBottom: 10}}/>
      </div>

      {/* <div className="form-group">
        <label>Profile Picture:</label>
        <input type="file" name="user_image" required accept=".png, .jpg, .jpeg, .gif" onChange={handleImage} style={{marginLeft: 10}}/>
      </div> */}

          <div className="text-center">
            <input
              type="submit"
              value="Update Profile"
              className="btn btn-secondary btn-lg"
              style={{ marginTop: 10 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
