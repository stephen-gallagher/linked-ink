import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import { Container } from 'react-bootstrap';

export default function Navbar(props) {
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl-3">
      <Link to="/" className="navbar-brand ml-5">
        Linked Ink
      </Link>
      <button
        className="navbar-toggler ml-4"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <div className="d-flex flex-row ">
            <div className="d-flex flex-row justify-content-between">
              <li className="nav-item active">
                <Link to="/explore" className="nav-link">
                  Explore <span className="sr-only"></span>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/all-artists" className="nav-link ">
                  Find an Artist
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all-studios" className="nav-link">
                  Find a Studio
                </Link>
              </li>
              {/* <li className="nav-item">
            <Link to="/artist-dashboard" className="nav-link">
              My Dashboard
            </Link>
          </li> */}
              <li className="nav-item">
                {props.user &&
                  (props.user.role === 'User' ? (
                    <Link
                      to={`/${props.user._id}/user-dashboard`}
                      className="nav-link"
                    >
                      My Dashboard
                    </Link>
                  ) : (
                    <Link
                      to={`/${props.user._id}/artist-profile`}
                      className="nav-link"
                    >
                      My Profile
                    </Link>
                  ))}
              </li>
            </div>
            <div className="d-flex flex-row">
              {!props.user && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link" href="#">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {props.user && (
                <li className="nav-item">
                  <Link
                    to="/"
                    onClick={() => handleLogout()}
                    className="nav-link"
                  >
                    Log out
                  </Link>
                </li>
              )}
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
