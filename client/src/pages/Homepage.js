import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

export default function Homepage(props) {
  const [tattoos, setTattoos] = useState([]);

  const getAllTattoos = () => {
    // get request to the server
    axios
      .get(`/api/crud`)
      .then((response) => {
        console.log(response.data);
        setTattoos(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTattoos();
  }, []);

  console.log(props);
  return (
    <div>
      <div>
        <Fade bottom duration={1000} delay={600} distance="30px">
          <img
            className="w-100 homepageImage"
            src="/tattoo-images/tattoo-machine-2.png"
          ></img>
        </Fade>
        <Fade right duration={1000} delay={600} distance="30px">
          <div className="homepageText w-30 col-6">
            {/* <img src="/tattoo-images/Linked-Ink.png"></img> */}
            <h1 className="homeHeading bg bg-dark text-center col-6 offset-3">
              Linked Ink
            </h1>
            <br></br>
            <h1 className="homeHeading">Find and book your new tattoo</h1>
            {!props.user ? (
              <>
                <Link
                  className="homeHeading text-dark"
                  // style={{ color: '#ffffff' }}
                  to="/signup"
                >
                  Sign up
                </Link>
                <p className="loginText">
                  Already have an account?{' '}
                  <Link
                    className="homeHeading text-dark"
                    // style={{ color: '#ffffff' }}
                    to="/login"
                  >
                    login
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
}

// GTswPON7eFz5LJbv
