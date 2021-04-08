import { useState,useContext } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {API_URL, API_AUTHREGISTRE,API_AUTHLOGIN} from '../utills/APICalls'
import {UserContext,ContributerContext ,AdminContext } from './exercises/MuscleContext';

import '../CSS/Login.css'

const  Signup = (props) => {
  const history = useHistory();
    // eslint-disable-next-line 
  const [user, setUser] = useContext( UserContext);
  // eslint-disable-next-line 
  const [contributer, setContributer] = useContext( ContributerContext);
 // eslint-disable-next-line 
 const [admin, setAdmin] = useContext( AdminContext);
 
  // for controlled form
  const [fname, setfName] = useState('')
  const [lname, setlName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // todo set message if you typed wrong
 // const [message, setMessage] = useState('')


  const onFnameChange = (e) => {
    const fname = e.target.value;
    setfName(fname);
  };
  
  const onLnameChange = (e) => {
    const lname = e.target.value;
    setlName(lname);
  };

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const  signupRedirect = async e => {

    const requestBody = {
      email: email,
      password: password
    }

    //login with API and get jwt
    const response = await axios.post(API_URL+API_AUTHLOGIN, requestBody)

    // destructure response
    const  token  = response.data.access_token

    // Save token to localStorage
    localStorage.setItem('jwtToken', token);

    // get user data from the token
    const decoded = jwt_decode(token)

    
     setUser(decoded)
     setContributer(decoded.roles.includes("ROLE_CONTRIBUTOR"));
     setAdmin(decoded.roles.includes("ROLE_ADMIN")); 
 
      history.replace("/profile");
   }

  const handleSumbit = async e => {
    try { 
      e.preventDefault()
      // post to backend with form submission
      const requestBody = {
        email: email,
        firstname:fname,
        lastname: lname,
        password: password,
      }

      const response = await axios.post(API_URL+API_AUTHREGISTRE, requestBody)

      signupRedirect(response)
      // set the current user in the top app state
    } catch(error) {
      console.log(error)
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
  } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
  } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
  }
  console.log(error);
    }
  
  }

  


  return (
    <div>
       < div className="LoginSingupWrap ">
    <div className="form fade-in">

     {/* <p>{message}</p>*/}
      <form onSubmit={handleSumbit}>

        <input
          id='fname'
          type='text'
          placeholder='your first name...'
          onChange={onFnameChange}
          value={fname}
        />
           <input
          id='lname'
          type='text'
          placeholder='your last name...'
          onChange={onLnameChange}
          value={lname}
        />

        <input
          id='email-input'
          type='email'
          placeholder='Your Email'
          onChange={onEmailChange}
          value={email}
        />

        <input 
          id='password-input'
          type='password'
          placeholder='password'
          onChange={onPasswordChange}
        />

        <input className="LCTA"
          type='submit'
          value='SIGN UP'
        />
      </form>
    </div>

    </div>
    </div>
  )
}

export default Signup