
import './App.css';
import SignInForm from './components/user/SignInForm';
import SignUpForm from './components/user/SignUpForm';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser]= useState({});

  useEffect(() => {
    const user = getUser();
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
        {isAuth ? 
        (
            <div>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/logout" onClick={onLogoutHandler}>Logout</Link> &nbsp;
            </div>
        ):
        (
          <div>
          <Link to="/">Home</Link> &nbsp;
          <Link to="/signup">Sign Up</Link> &nbsp;
          <Link to="/signin">Sign In</Link> &nbsp;
        </div>
        )
      }
      </nav>


      <div>
        <Routes>
          <Route path='/' element={ isAuth ? <AuthorList></AuthorList> : <Signin login={loginHandler}></Signin>}></Route>
          <Route path='/signup' element={<Signup register={registerHandler}></Signup>}></Route>
          <Route path='/signin' element={isAuth ? <AuthorList></AuthorList> : <Signin login={loginHandler}></Signin>}></Route>
        </Routes>
    </div>
    </div>
  );
}

export default App;
