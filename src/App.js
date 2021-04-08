import { Fragment, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from "jwt-decode";


import GlobalStyle from "./theme/globalStyles";

import { UserContext, ContributerContext } from './components/exercises/MuscleContext';


import AppHeader from './containers/AppHeader/AppHeader'
import AppFooter from './containers/AppFooter/AppFooter'
import Navbar from './components/Navbar'
import Login from './components/Login'

import Signup from './components/Signup'
import Welcome from './components/Welcome'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import Exercises from './components/exercises/Exercises'
import Workout from './components/workout/Workout'

import './App.css';

function App() {
  
 // if (process.env.NODE_ENV !== 'production') console.log(jwt_decode)
  // user data if the a user is logged in 
  const [user, setUser] = useContext(UserContext);
  const [contributer, setContributer] = useContext(ContributerContext);

  // if the user navigates away and comes back, look for a jwt
  useEffect(() => {

    const token = localStorage.getItem('jwtToken')

    if (token) {

      // set the current usr if jwt is found
      const decoded = jwt_decode(token)
      setUser(decoded)
      setContributer(decoded.roles.includes("ROLE_CONTRIBUTOR"));

    } else {
      // double check that current user is null if the jwt is not found 
      setUser(null)
    }
  }, [setUser,setContributer])


  // deletes jwt from local storage to log user out
  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setUser(null)
    }
  }


  return (
    <Fragment>
      <GlobalStyle />
      <AppHeader />

      <Router>

        <Navbar currentUser={user} handleLogout={handleLogout} />

        <div className="jib">
          <Switch>

            <Route path="/Signup" component={Signup} />
            <Route path="/login" component={Login} />

            <Route 
              path="/dashboard" 
              render={(props) => user ? <Dashboard contributer={contributer}/> : <Redirect to="/login" /> }
            />
                  <Route 
              path="/exercises" 
              render={(props) => user ? <Exercises contributer={contributer}/> : <Redirect to="/login" /> }
            />

            <Route 
              path="/workouts" 
              render={(props) => user ? <Workout contributer={contributer}/> : <Redirect to="/login" /> }
            />
                  <Route 
              path="/profile" 
              render={(props) => user ? <Profile contributer={contributer}/> : <Redirect to="/login" /> }
            />

            <Route exact path="/" component={Welcome} />

          </Switch>
        </div>

      </Router>
      <AppFooter />
    </Fragment>
  );
}

export default App;
