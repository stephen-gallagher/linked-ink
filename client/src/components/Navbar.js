import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../services/auth'

export default function Navbar(props) {

    const handleLogout = () => {
		logout().then(() => {
			props.setUser(null);
		})
	}


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link to="/" className="navbar-brand">Tattoo Finder</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to="/explore" className="nav-link" >Explore <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item">
        <Link to="/all-artists" className="nav-link">Find an Artist</Link>
      </li>
      <li className="nav-item">
        <Link to="/all-studios" className="nav-link">Find a Studio</Link>
      </li>
      <li className="nav-item">
        <Link to="/:id/artist-dashboard" className="nav-link">My Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/:id/artist-profile" className="nav-link">My Profile</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Log In</Link>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={() => handleLogout()} className="nav-link">Log out</Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link" href="#">Sign up</Link>
      </li>
      <li className="nav-item dropdown">
        <Link to="/" className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Search
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="/all-artists">Find an Artist</a>
          <a className="dropdown-item" href="/all-studios">Find a Studio</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    )
}
