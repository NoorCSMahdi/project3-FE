import React, { useEffect, useState } from 'react'
import './App.css';
import SignInForm from './components/user/SignInForm';
import SignUpForm from './components/user/SignUpForm';
import {Routes, Route, Link} from 'react-router-dom'
import Axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import AddCarForm from './components/forms/AddCarForm';
import AddExhibitionForm from './components/forms/AddExhibitionForm';
import BookingForm from './components/forms/BookingForm';
import RequestForm from './components/forms/RequestForm';
import ExhibitionPage from './components/exhibitionView/Exhibitions';
import ExhibitionCarsPage from './components/exhibitionView/carsOfEachExhibitions'
import RequestList from './components/adminView/RequestList';
// import { Exhibition } from '../../Voiture/models/Exhibition';

function App() {
  
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser]= useState({});


  useEffect(() => {
    const user = setUser();
    console.log(user);

    if(user){
      setIsAuth(true);
      setUser(user);
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  }, [])
  
  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
    .then(res => {
      console.log(res)
    })

    .catch(err => {
      console.log(err)
    })
  }

  const loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
    .then(res => {
      console.log(res.data.token);

      //Makes sure the token is Valid
      let token = res.data.token;

      if(token != null){
        localStorage.setItem("token", token);
        const user = getUser();
        console.log(user);
        user ? setIsAuth(true): setIsAuth(false)
        user ? setUser(user): setUser(null)
      }
    })

    .catch(err => {
      console.log(err)
    })
  }

  const getUser = ()=> {
    const token = getToken();
    return token ? jwtDecode(token).user : null
  }

  const getToken =()=>{
    const token = localStorage.getItem("token");
    return token;
  }

  const onLogoutHandler =(e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }

  return (
    <div className="App">
      <nav>
        {isAuth ? (
          <div>
            <Link to="/">Home</Link> &nbsp;
            <Link to="/exhibition/index">Exhibition</Link>&nbsp;
            <Link to="/request/add">Submit Request</Link>&nbsp;
            <Link to="/request/index"> Request List</Link>&nbsp;
            <Link to="/logout" onClick={onLogoutHandler}>Logout</Link> &nbsp;
          </div>
        ) : (
          <div>
            <Link to="/">Home</Link> &nbsp;
            <Link to="/exhibition/index">Exhibition</Link>&nbsp;
            <Link to="/signup">Sign Up</Link> &nbsp;
            <Link to="/signin">Sign In</Link> &nbsp;
          </div>
        )}
      </nav>


      <div>
        <Routes>
          <Route path="/" />
          <Route path='/exhibition/index' element={<ExhibitionPage></ExhibitionPage>} />
          <Route path="/signup" element={<SignUpForm register={registerHandler} />} />
          <Route path="/signin" element={isAuth ? ( <AddCarForm />) : (<SignInForm login={loginHandler} /> )}/>
        {/* Add car acting as homepage in this scenario */}
        <Route path="/request/add" element={<RequestForm user={user}></RequestForm>} />
        <Route path='/request/index' element={<RequestList></RequestList>} />
        {/* <Route path='' element={} /> */}
         {/* <Route path='' element={} /> */}
          {/* <Route path='' element={} /> */}
        </Routes>
      </div>
     
     
  
    </div>
  );
}

export default App;
