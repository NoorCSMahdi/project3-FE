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
import ExhibitionPage from './components/exhibitionView/exhibitions';
import ExhibitionCarsPage from './components/exhibitionView/carsOfEachExhibitions'
import RequestList from './components/adminView/RequestList';
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewForm from './components/review/ReviewForm';
import UserProfile from './components/profileView/UserProfile';

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
       <div className="px-3 py-2 text-bg-dark border-bottom text-right header">
       <nav>
  <div className="container d-inline-flex justify-content-start ms-auto">
    <Link className='nav-link text-white d-inline me-auto float-start' to="/">
      <img className='logo' src='voiture-logo-white-transparent.png'/>
    </Link>
    {isAuth ? (
      <div>
        <Link className='nav-link text-white d-inline' to="/">Home</Link> &nbsp;
        <Link className='nav-link text-white d-inline' to="/exhibition/index">Exhibition</Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/review/add">Review</Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/request/add">Submit Request</Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/request/index"> Request List</Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/user/detail"><img className='profile' src='profile.png'/></Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/logout" onClick={onLogoutHandler}>Logout</Link> &nbsp;
      </div>
    ) : (
      <div>
        <Link className='nav-link text-white d-inline' to="/">Home</Link> &nbsp;
        <Link className='nav-link text-white d-inline' to="/exhibition/index">Exhibition</Link>&nbsp;
        <Link className='nav-link text-white d-inline' to="/signup">Sign Up</Link> &nbsp;
        <Link className='nav-link text-white d-inline' to="/signin">Sign In</Link> &nbsp;
      </div>
    )}
  </div>
</nav>
  </div>

      <div>
        <Routes>
          <Route path="/" />
          <Route path='/exhibition/index' element={<ExhibitionPage></ExhibitionPage>} />
          <Route path="/signup" element={<SignUpForm register={registerHandler} />} />
          <Route path="/signin" element={isAuth ? ( <AddCarForm />) : (<SignInForm login={loginHandler} /> )}/>
        {/* Add car acting as homepage in this scenario */}
        <Route path="/request/add" element={<RequestForm user={user}></RequestForm>} />
        <Route path='/request/index' element={<RequestList user={user}></RequestList>} />
        <Route path='/review/add' element={<ReviewForm user={user}></ReviewForm>} />
        <Route path='/user/detail' element={<UserProfile user={user}></UserProfile>} />
        {/* <Route path='' element={} /> */}
         {/* <Route path='' element={} /> */}
          {/* <Route path='' element={} /> */}
        </Routes>
      </div>
     
      <footer className="px-3 py-2 text-bg-dark mt-5 stickToBottom">
      <div className="container">
    <p className="mb-1 text-white">&copy; 2024 | Voiture App </p>
</div>
      </footer>
  
    </div>
  );
}

export default App;
