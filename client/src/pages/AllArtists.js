import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default function AllArtists() {
  const [allArtists, setAllArtists] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [styleSearch, setStyleSearch] = useState('');

  const getAllArtists = () => {
    // get request to the server
    axios
      .get(`/api/crud/all-artists`)
      .then((response) => {
        setAllArtists(response.data);
      })
      .catch((err) => console.log(err));
  };
  console.log('theArtists', allArtists);
  useEffect(() => {
    getAllArtists();
  }, []);

  const handleNameSearchChange = (event) => {
    event.preventDefault();
    setNameSearch(event.target.value);
  };

  if (allArtists === []) {
    return <></>;
  }

  const handleStyleSearchChange = (event) => {
    event.preventDefault();
    setStyleSearch(event.target.value);
  };

  let newList = allArtists.filter((artist) => {
    return `${artist.tattooStyle}`
      .toLowerCase()
      .includes(styleSearch.toLowerCase());
  });
  if (nameSearch !== '') {
    newList = allArtists.filter((artist) => {
      return `${artist.firstName}${artist.lastName}`
        .toLowerCase()
        .includes(nameSearch.toLowerCase());
    });
  }

  if (allArtists === []) {
    return <></>;
  }

  return (
    <div
      className="pt-5 background"
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      <div className="border border-white border-4 col-6 offset-3">
        <h1 className="exploreHeadingText mt-4">Find an Artist</h1>
        <div className="col-6 offset-3">
          <h4 className="text-dark">
            Browse through the list of our registered artists to find the
            perfect match for your next tattoo idea. Click on the image below to
            view their profile
          </h4>
          <br />
        </div>

        <div className="d-flex p5 justify-content-around mb-4 ">
          <div className="p5 ml-3">
            <label className="searchText text-dark">
              Search by name:&nbsp;{' '}
            </label>
            <input
              className="border border-white pl-3"
              type="text"
              name="search"
              id="search"
              value={nameSearch}
              placeholder="e.g John Smith"
              onChange={handleNameSearchChange}
            />
          </div>
          <div>
            <label className="searchText text-dark">
              Search by style: &nbsp;
            </label>
            <input
              className="border border-white pl-3"
              type="text"
              name="search"
              id="search"
              value={styleSearch}
              placeholder="e.g Traditional"
              onChange={handleStyleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="col-10 offset-1 d-flex flex-wrap justify-content-center">
        {newList.map((artist) => {
          return (
            <div className="p-4 bg-image hover-overlay">
              <Fade bottom duration={1000} delay={600} distance="30px">
                <div className="container">
                  <Link to={`/${artist._id}/artist-profile`}>
                    <img
                      className="border border-white border-4"
                      // className="artist-image rounded border border-dark shadow"
                      src={artist.profilePicture}
                      style={{
                        width: '300px',
                        height: '400px',
                        borderRadius: '15px',
                      }}
                    ></img>
                    <div className="overlay">
                      <div className="artistInformation">
                        {' '}
                        <h2 className="exploreHeadingText">
                          {' '}
                          {artist.firstName} {artist.lastName}
                        </h2>
                        <p></p>
                        {artist.tattooStyle.map((style) => {
                          return <p> &nbsp; {style}. </p>;
                        })}
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  className="mask"
                  style={{
                    background:
                      'linear-gradient(45deg, rgba(29, 236, 197, 0.5), rgba(91, 14, 214, 0.5) 100%)',
                  }}
                ></div>
                {/* <p>
                    {' '}
                    {artist.firstName} {artist.lastName}
                  </p> */}

                {/* <div className="d-flex flex-row align-items-center justify-content-center">
                  <p>
                    <strong>Style/s: </strong>
                  </p>
                  {artist.tattooStyle.map((style) => {
                    return <p> &nbsp; {style}. </p>;
                  })} */}
                {/* </div> */}
              </Fade>
              {/* ) */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
