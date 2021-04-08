import {useEffect,Redirect,useState,useContext,Fragment } from 'react'

import {UserContext,ContributerContext ,AdminContext,ProfileContext } from './exercises/MuscleContext';

import Dashboard from './Dashboard'



import Profile from './Profile'
import Login from './Login'
import '../CSS/Rolechecker.css'

export default function RoleCheck(props) {
  
  const curUser=props.currentUser;
/*
  const [user, setUser] = useState(false);
  const [contributer, setContributer] = useState(false);
  const [admin, setAdmin] = useState(false);
*/
  const [user, setUser] = useContext( UserContext);
  const [contributer, setContributer] = useContext( ContributerContext);
  const [admin, setAdmin] = useContext( AdminContext);


  useEffect(() => {
    const setRoles = async function() {
      try {
        setUser(curUser.user.roles.includes("ROLE_USER"))
        setContributer(curUser.user.roles.includes("ROLE_CONTRIBUTOR"));
        setAdmin(curUser.user.roles.includes("ROLE_ADMIN"));
      } catch(error) {
        console.log(error)
    
      }
    }
  
    setRoles()
  }, [curUser, props])
  
   if(!props.currentUser) return <Redirect to='/login' component={ Login } currentUser={ props.currentUser } />
  return (
    <Fragment>
    <div className="RoleWrap">
         <Dashboard className="cal" user={user} contributer={contributer} admin={admin} currentUser={ props.currentUser }/>

      </div>

     {/* <Profile curUser={curUser.user} />*/}
 </Fragment>

  )
}