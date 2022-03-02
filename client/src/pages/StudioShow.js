import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import MapboxGL from "@react-native-mapbox-gl/maps";
import Fade from 'react-reveal/Fade';

import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router-dom';
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const geocoder = mbxGeocoding({ accessToken: mapboxgl.accessToken });

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ';

export default function StudioShow(props) {
  console.log('studio props', props);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewArtist, setReviewArtist] = useState([]);
  const [reviewAuthorUsername, setReviewAuthorUsername] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [showArtists, setShowArtists] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const showArtistsButton = (e) => {
    e.preventDefault();
    setShowArtists(true);
    setShowReviews(false);
  };

  const showReviewsButton = (e) => {
    e.preventDefault();
    setShowArtists(false);
    setShowReviews(true);
  };

  // const mapContainer = React.createRef()

  // const mapContainer = useRef(null);
  // const [map, setMap] = useState(null)
  // const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(9);

  const getProfileReviews = () => {
    // get request to the server
    axios
      .get(`/api/crud/studio/${props.match.params.id}/reviews`)
      .then((response) => {
        // console.log('reviews', response.data)
        setReviewArtist(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProfileReviews();
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/crud/studio/${props.match.params.id}/reviews`, {
        reviewText,
        rating,
        reviewAuthorUsername,
      })
      .then((response) => {
        //  console.log('reviewData', response.data)
        setReviewText('');
        setRating(0);
        setMessage('Your review has been posted!');
        console.log('response data', response.data);
        setReviewArtist(response.data.reviews);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [artists, setArtists] = useState([]);
  const [imageURL, setImageURL] = useState('');

  const [geometry, setGeometry] = useState(null);

  const getStudio = () => {
    // get request to the server
    axios
      .get(`/api/crud/studio/${props.match.params.id}`)
      .then((response) => {
        console.log('response data', response.data[0]);
        console.log('geography', response.data[0].geometry.coordinates);
        setName(response.data[0].name);
        setLocation(response.data[0].location);
        setDescription(response.data[0].description);
        setImageURL(response.data[0].imageURL);
        setLng(response.data[0].geometry.coordinates[0]);
        setLat(response.data[0].geometry.coordinates[1]);
        setGeometry(response.data[0].geometry);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStudio();
  }, []);

  const getCurrentUser = () => {
    axios
      .get(`/api/crud/users`)
      .then((response) => {
        // console.log('userinfoooo', response.data._id)
        setCurrentUser(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getStudioArtists = () => {
    // get request to the server
    axios
      .get(`/api/crud/studios/${props.match.params.id}`)
      .then((response) => {
        setArtists(response.data);
        console.log('studioartists', response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStudioArtists();
  }, []);

  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const mapContainerStyle = {
    width: '90%',
    height: '250px',
  };

  // const Map = () => {

  useEffect(() => {
    if (lng !== 0 && lat !== 0) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        accessToken: MAPBOX_TOKEN,
        style: 'mapbox://styles/stephengallagher/ckufe62dp408217mvz6kmroo5',
        // Empire State Building [lng, lat]
        center: [lng, lat],
        zoom: 14,
        // map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      });

      setMap(map);
      // let marker = new mapboxgl.Marker()
      //   .setLngLat([lng, lat])
      //   .addTo(map.current);
    }
  }, [lat]);

  const Marker = ({ map }) => {
    const markerRef = useRef();

    useEffect(() => {
      const marker = new mapboxgl.Marker(markerRef)
        .setLngLat([lng, lat])
        .addTo(map);

      // return () => marker.remove()
    });
  };
  // };

  // useEffect(() => {
  //   let marker;
  //   if (lng !== 0 && lat !== 0) {
  //     map.current = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: 'mapbox://styles/stephengallagher/ckufe62dp408217mvz6kmroo5',
  //       center: [lng, lat],
  //       zoom: 14,
  //     });

  //     marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  //   }
  // }, []);

  // useEffect(() => {
  //   const marker = new mapboxgl.Marker({
  //     color: '#FFFFFF',
  //     draggable: true,
  //   })
  //     .setLngLat([30.5, 50.5])
  //     .addTo(map);
  // });

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/crud/studio/${props.match.params.id}`)
      .then((response) => {
        console.log('joindata', response.data);
        getStudioArtists();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteReview = (id) => {
    axios.delete(`/api/crud/studio/reviews/${id}`);
    getProfileReviews();
  };

  if (mapContainer === null) {
    return <></>;
  }

  if (name === '') {
    return <></>;
  }

  return (
    <div
      className="pt-3 background"
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      {/* <div className="col-6"> */}

      <div className="row">
        <div className="col-3 offset-2 mt-1 ml-1">
          <div
            className="card mb-3 border-white border-4 "
            style={{
              background: '#0c2112',
              height: '90vh',
              overflowX: 'auto',
            }}
          >
            <Fade left duration={1000} delay={600} distance="30px">
              <img
                src={imageURL}
                className="card-img-top rounded mx-auto d-block mt-3 border border-white"
                style={{ width: '300px' }}
              />
              <h2 className="card-title exploreHeadingText">{name}</h2>
              <h5
                className="border-bottom pb-3 pt-2 offset-2"
                style={{ width: '300px', textAlign: 'center' }}
              >
                {location}
              </h5>
              <div className="card-body d-flex flex-column justify-content-start align-items-start p-3">
                <p>
                  <strong>About:</strong> {description}
                </p>
              </div>

              <div className="sidebar d-flex justify-content-center">
                {/* </div> */}
                <div
                  ref={mapContainer}
                  className="mapContainer ml-2 mb-5"
                  style={{ width: '400px', height: '350px' }}
                />
              </div>
              {/* <button
              className="btn btn-success col-8 mb-2 mx-auto d-block"
              onClick={showArtistsButton}
            >
              Artists at the studio
            </button>
            <button
              className="btn btn-success col-8 mb-2 mx-auto d-block"
              onClick={showReviewsButton}
            >
              Reviews
            </button> */}
            </Fade>
          </div>
        </div>

        {showArtists && (
          <div className="col-5 mt-1 mb-3">
            <div
              className="card border border-white border-4"
              style={{
                background: '#0c2112',
                height: '90vh',
                overflowX: 'auto',
              }}
            >
              <Fade top duration={1000} delay={600} distance="30px">
                <div className="border border-white border-4 m-2">
                  <div className="bg-white border border-dark col-10 offset-1 text-white p-2 rounded mt-3">
                    <h2
                      className="userHeading"
                      style={{
                        color: '#0c2112',
                      }}
                    >
                      Artists at this studio
                    </h2>
                  </div>

                  <div className="d-flex flex-wrap align-items-center justify-content-center pt-5">
                    {artists.map((artist) => {
                      return (
                        <div className="p-2 artist-grid">
                          <Link to={`/${artist._id}/artist-profile`}>
                            <img
                              className="artist-image rounded border border-white shadow pb-2 img-grid"
                              src={artist.profilePicture}
                              style={{
                                width: '150px',
                                height: '250px',
                              }}
                            ></img>
                          </Link>
                          <h5
                            className="studioArtistName"
                            style={{
                              textDecoration: 'none',
                            }}
                          >
                            {' '}
                            {artist.firstName} {artist.lastName}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                  {currentUser && currentUser.role === 'Artist' ? (
                    <form onSubmit={handleJoinSubmit}>
                      <button
                        type="submit"
                        className="btn btn-success mt-3 mb-3"
                      >
                        Join this studio
                      </button>
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              </Fade>
              <Fade bottom duration={1000} delay={600} distance="30px">
                <div className="border border-white border-4 m-2">
                  <div className="bg-white border border-dark col-10 offset-1 text-white p-2 rounded mt-3">
                    <h2
                      className="userHeading "
                      style={{
                        color: '#0c2112',
                      }}
                    >
                      Reviews
                    </h2>
                  </div>
                  {reviewArtist.map((review) => {
                    return (
                      <div
                        className="card col-6 offset-3 align-content-center mb-3 d-flex flex-column justify-content-center align-items-center border border-white mt-5"
                        style={{
                          background: '#0c2112',
                        }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">
                            Username: {review.reviewAuthorUsername}
                          </h5>
                          <p
                            class="starability-result align-items-center d-flex justify-content-center margin-1"
                            data-rating={`${review.rating}`}
                          >
                            Rated: {`${review.rating}`} stars
                          </p>
                          <p className="card-text">
                            Review: {review.reviewText}
                          </p>

                          {/* ({review.reviewAuthor} === {currentUser._id} ?  */}
                          {currentUser &&
                          currentUser._id === review.reviewAuthor ? (
                            <button
                              onClick={() => {
                                deleteReview(review._id);
                              }}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <form
                    className="mb-3 col-6 offset-3 pt-5 pb-5"
                    onSubmit={handleReviewSubmit}
                  >
                    <div className="mb-3 offset-4">
                      <fieldset className="starability-fade">
                        <legend>Rating:</legend>
                        <input
                          type="radio"
                          id="no-rate"
                          className="input-no-rate"
                          name="rating"
                          value="0"
                          checked
                          aria-label="No rating."
                        />
                        <input
                          type="radio"
                          id="first-rate1"
                          name="review[rating]"
                          value="1"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label for="first-rate1" title="Terrible">
                          1 star
                        </label>
                        <input
                          type="radio"
                          id="first-rate2"
                          name="review[rating]"
                          value="2"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label for="first-rate2" title="Not good">
                          2 stars
                        </label>
                        <input
                          type="radio"
                          id="first-rate3"
                          name="review[rating]"
                          value="3"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label for="first-rate3" title="Average">
                          3 stars
                        </label>
                        <input
                          type="radio"
                          id="first-rate4"
                          name="review[rating]"
                          value="4"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label for="first-rate4" title="Very good">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="first-rate5"
                          name="review[rating]"
                          value="5"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label for="first-rate5" title="Amazing">
                          5 stars
                        </label>
                      </fieldset>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="body">
                        Your review:
                      </label>
                      <textarea
                        className="form-control"
                        name="review[body]"
                        cols="30"
                        rows="3"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button className="btn btn-success col-6" type="submit">
                      Submit your review
                    </button>
                  </form>
                </div>
              </Fade>
            </div>
          </div>
        )}

        {/* {showReviews && (
          <div className="col-6 mt-3 card mb-3 ">
            <img
              src="/tattoo-images/tattoo-arm-4.jpg"
              alt="tattoo-girl"
              className="card-img-top"
              style={{ height: '150px' }}
            ></img>
            <h2 className="mt-4">LEAVE A REVIEW</h2> */}
        {/* <div className="bg-white border border-dark col-12 text-white p-2 rounded">
                <h2
                  className="userHeading"
                  style={{
                    color: '#0c2112',
                  }}
                >
                  Artists at this studio
                </h2>
              </div>
            <form className="mb-3" onSubmit={handleReviewSubmit}>
              <div className="mb-3 offset-4">
                <fieldset className="starability-fade">
                  <legend>Rating:</legend>
                  <input
                    type="radio"
                    id="no-rate"
                    className="input-no-rate"
                    name="rating"
                    value="0"
                    checked
                    aria-label="No rating."
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="review[rating]"
                    value="1"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="review[rating]"
                    value="2"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="review[rating]"
                    value="3"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="review[rating]"
                    value="4"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="review[rating]"
                    value="5"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="body">
                  Your review:
                </label>
                <textarea
                  className="form-control"
                  name="review[body]"
                  cols="30"
                  rows="3"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              <button className="btn btn-success col-6" type="submit">
                Submit your review
              </button>
            </form>
            {reviewArtist.map((review) => {
              return (
                <div className="card col-10 align-content-center mb-3 d-flex flex-column justify-content-center align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      Username: {review.reviewAuthorUsername}
                    </h5>
                    <p
                      class="starability-result"
                      data-rating={`${review.rating}`}
                    >
                      Rated: {`${review.rating}`} stars
                    </p>
                    <p className="card-text">Review: {review.reviewText}</p>

                    {/* ({review.reviewAuthor} === {currentUser._id} ?  */}
      </div>
    </div>
  );
}
