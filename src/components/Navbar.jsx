import { Link } from 'react-router-dom'



import '../CSS/Navbar.css'
const Navbar = (props) => {

  // if the user is logged in
  const loggedIn = (
    <>
      <Link to="/" style={{ textDecoration: 'none' }}>
       <li><span onClick={props.handleLogout}>log out</span></li>
      </Link>

      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
      <li>dashboard</li>
      </Link>

      <Link to= "/exercises" style={{ textDecoration: 'none' }}>
      <li>exercises</li>
      </Link>

      <Link to= "/workouts" style={{ textDecoration: 'none' }}>
      <li>workouts</li>
      </Link>

      
      <Link to="/profile" style={{ textDecoration: 'none' }}>
      <li><span onClick={props.showProfile}>profile</span></li>
      </Link>
    </>
  )

  // if the user is logged out
  const loggedOut = (
    <>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <li>sign up</li>
      </Link>

      <Link to="/login" style={{ textDecoration: 'none' }}>
       <li>login</li>
      </Link>
    </>
  )

  return (
    <nav className="navigation">
        <input type="checkbox" id="nav"/>
        <label htmlFor="nav">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul  className="menu">
      {props.currentUser ? loggedIn : loggedOut}

    
      </ul>
    </nav>
  )
}

export default Navbar