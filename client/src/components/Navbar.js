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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link to="/" class="navbar-brand">Tattoo Finder</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link to="/" class="nav-link" >Home <span class="sr-only"></span></Link>
      </li>
      <li class="nav-item">
        <Link to="/all-artists" class="nav-link">Find an Artist</Link>
      </li>
      <li class="nav-item">
        <Link to="/login" class="nav-link">Log In</Link>
      </li>
      <li class="nav-item">
        <Link to="/" onClick={() => handleLogout()} class="nav-link">Log out</Link>
      </li>
      <li class="nav-item">
        <Link to="/signup" class="nav-link" href="#">Sign up</Link>
      </li>
      <li class="nav-item dropdown">
        <Link to="/notcreated" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    )
}

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" class="navbar-brand">Navbar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link to="/artists" class="nav-link">Find an Artist</Link>
      </li>
      <li class="nav-item">
        <Link to="/signup" class="nav-link" href="#">Sign up</Link>
      </li>
      <li class="nav-item dropdown">
        <Link to="/notcreated" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>