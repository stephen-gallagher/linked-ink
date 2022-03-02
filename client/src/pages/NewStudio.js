import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import service from '../api/service';
import styled from 'styled-components';

export default function Signup(props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleFileUpload = (e) => {
    // const uploadData = new FormData()
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        setImageURL(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    axios
      .post(`/api/crud/new-studio`, { name, location, description, imageURL })
      .then((response) => {
        props.history.push(`/all-studios`);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  if (location === null) {
    return <></>;
  }

  return (
    <div
      className="signupPage"
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="row">
          {/* <h1 className="text-center">Add a new Studio</h1> */}
          <div className="col-md-10 offset-md-1 col-xl-10 offset-xl-1">
            <div className="card shadow border border-white border-4">
              <img
                src="/tattoo-images/tattoo-sign-1.jpeg"
                alt="tattoo-girl"
                className="card-img-top border-bottom border-white border-4"
              ></img>
              <div
                className="card-body"
                style={{ background: 'rgb(17,27,26)' }}
              >
                <h3
                  className="mt-4 background exploreHeadingText"
                  // style={{ color: 'rgb(4, 6, 13)' }}
                >
                  Add a new Studio
                </h3>
                <h5 className="card-title">Enter the details here</h5>
                <form onSubmit={handleSubmitUser}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      required
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="location">
                      Location:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="location"
                      value={location}
                      required
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      About the studio:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="imageURL">
                      Profile picture:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="imageURL"
                      onChange={handleFileUpload}
                    />
                    {imageURL && (
                      <img src={imageURL} alt="" style={{ height: '200px' }} />
                    )}
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-success btn-block col-12"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
