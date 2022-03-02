import { useState } from 'react';
import { login } from '../services/auth';
import Fade from 'react-reveal/Fade';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    login(username, password)
      .then((response) => {
        if (response.message) {
          // reset the form
          setUsername('');
          setPassword('');
          // set the message
          setMessage(response.message);
        } else {
          // user is correctly signed up in the backend
          // add the user to the state of App.js
          props.setUser(response);
          // redirect to the projects overview
          if (response.role === 'User') {
            props.history.push(`/${response._id}/user-dashboard`);
          } else if (response.role === 'Artist') {
            props.history.push(`/${response._id}/artist-profile`);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
        height: '90VH',
      }}
    >
      <div className="row background pt-10">
        <div className="col-md-6 offset-md-3 col-xl-3 offset-xl-2 my-auto pb-5">
          <Fade left duration={1000} delay={600} distance="30px">
            <div className="card shadow border border-white">
              {/* <img
                src="/tattoo-images/tattoo-girl-1.jpeg"
                alt="tattoo-girl"
                className="card-img-top"
              ></img> */}
              <div
                className="card-body"
                style={{ background: 'rgb(17,27,26)' }}
              >
                <h3
                  className="mt-4 background exploreHeadingText"
                  // style={{ color: 'rgb(4, 6, 13)' }}
                >
                  Login
                </h3>
                <h5 className="card-title">Enter your details here</h5>
                <form novalidate validated={validated} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      style={{ background: 'rgb(235, 235, 235)' }}
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      style={{ background: 'rgb(235, 235, 235)' }}
                      name="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success col-12 mt-3" type="submit">
                    Log in
                  </button>
                  {message && <h3>{message}</h3>}
                </form>
              </div>
            </div>
          </Fade>
        </div>
        <div className="col-6 offset-1 relative-bottom">
          <Fade right duration={1000} delay={600} distance="30px">
            <img
              className=" mr-5"
              src="/tattoo-images/tattoo-boy-transparent-4.png"
              alt="tattoo-boy"
              style={{
                height: '900px',
                paddingTop: '200px',
                paddingRight: '75px',
              }}
              // className="card-img-top"
            ></img>
          </Fade>
        </div>
      </div>
    </div>
  );
}
