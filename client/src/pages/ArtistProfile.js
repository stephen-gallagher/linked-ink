import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../Starability.css';
import { Link } from 'react-router-dom';
import service from '../api/service';
import Fade from 'react-reveal/Fade';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

export default function ArtistProfile(props) {
  const [user, setUser] = useState(null);
  const [tattoos, setTattoos] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewArtist, setReviewArtist] = useState([]);
  const [reviewAuthorUsername, setReviewAuthorUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  const [bodyPart, setBodyPart] = useState('');
  const [tattooSize, setTattooSize] = useState('');
  const [tattooDescription, setTattooDescription] = useState('');
  const [referenceImage, setReferenceImage] = useState('');

  const [showArtistWork, setShowArtistWork] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [tattooShow, setTattooShow] = useState(false);

  const [imageURL, setImageURL] = useState('');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  const [reviewOwner, setReviewOwner] = useState(true);
  const [selectedTattoo, setSelectedTattoo] = useState(null);

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  const showCollectionFormButton = (e) => {
    e.preventDefault();
    setShowCollectionForm(!showCollectionForm);
  };

  const animatedComponents = makeAnimated();

  const showArtistWorkButton = (e) => {
    e.preventDefault();
    setShowArtistWork(true);
    setShowReviews(false);
    setShowBookingForm(false);
    setShowImageUploadForm(false);
    setTattooShow(false);
  };

  const showReviewsButton = (e) => {
    e.preventDefault();
    setShowReviews(true);
    setShowArtistWork(false);
    setShowBookingForm(false);
    setShowImageUploadForm(false);
    setTattooShow(false);
  };

  const showBookingFormButton = (e) => {
    e.preventDefault();
    setShowReviews(false);
    setShowArtistWork(false);
    setShowBookingForm(true);
    setShowImageUploadForm(false);
    setTattooShow(false);
  };

  const showImageUploadFormButton = (e) => {
    e.preventDefault();
    setShowImageUploadForm(true);
    setShowReviews(false);
    setShowArtistWork(false);
    setShowBookingForm(false);
    setTattooShow(false);
  };

  const handleTattooShow = (tattoo) => {
    setSelectedTattoo(tattoo);
    console.log('tat', selectedTattoo);
    setShowImageUploadForm(false);
    setShowReviews(false);
    setShowArtistWork(false);
    setShowBookingForm(false);
    setTattooShow(true);
  };

  const getUser = () => {
    axios
      .get(`/api/crud/${props.match.params.id}/artist-profile/user`)
      .then((response) => {
        console.log('userdata', response.data);
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, []);

  const getCurrentUser = () => {
    axios
      .get(`/api/crud/users`)
      .then((response) => {
        console.log('userinfoooo');
        setCurrentUser(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getUserTattoos = () => {
    axios
      .get(`/api/crud/${props.match.params.id}/artist-profile`)
      .then((response) => {
        console.log('get artist', response.data);
        setTattoos(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserTattoos();
  }, []);

  const getUserCollections = () => {
    // get request to the server
    axios
      .get(`/api/crud/user/collections`)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserCollections();
  }, []);

  const getProfileReviews = () => {
    axios
      .get(`/api/crud/${props.match.params.id}/artist-profile/reviews`)
      .then((response) => {
        setReviewArtist(response.data);
        response.data.forEach((author) => {});
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProfileReviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/crud/${props.match.params.id}/artist-profile/reviews`, {
        reviewText,
        rating,
      })
      .then((response) => {
        setReviewText('');
        setRating(0);
        setMessage('Your review has been posted!');
        setReviewArtist(response.data.reviews);
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const handleCollectionSubmit = (e) => {
    console.log('selected', selectedTattoo._id);
    // console.log('tattoo id hey', id);
    e.preventDefault();
    console.log('this is e', e);
    axios
      .put(`/api/crud/tattoos/${selectedTattoo._id}`, {
        selectedCollection: selectedCollection,
      })
      .then((response) => {
        console.log(response);
        setSelectedCollection([]);
        setMessage('Image has been added to your collection');
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const handleNewCollectionSubmit = (e) => {
    console.log(
      'title and description',
      collectionTitle,
      collectionDescription
    );
    e.preventDefault();
    axios
      .post('/api/crud/collections/new', {
        collectionTitle,
        collectionDescription,
      })
      .then((response) => {
        setCollectionTitle('');
        setCollectionDescription('');
        setMessage('Collection created');
        getUserCollections();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const handleBookingSubmit = (e) => {
    setBookingMessage('Your request has been sent!');
    setBodyPart('');
    setTattooSize('');
    setTattooDescription('');
    setReferenceImage('');
  };

  const deleteReview = (id) => {
    console.log('this id', id);
    axios
      .delete(`/api/crud/artist-profile/reviews/${id}`)
      .then((response) => {
        console.log('reviewresponse', response.data);
        getProfileReviews();
        // response.data.forEach(author => {
      })
      // })
      .catch((err) => console.log(err));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value;
    let split = tags.split(',');
    setTags(split);
  };

  const handleCollectionChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setSelectedCollection(newValuesArr);
    console.log('the new array', newValuesArr);
    console.log('the state', selectedCollection);
  };

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

  const handleImageUploadSubmit = (e) => {
    e.preventDefault();
    service
      .saveNewTattoo(imageURL, caption, tags)
      .then((response) => {
        setImageURL(response.imageURL);
      })
      .catch((err) => console.log(err));

    axios
      .post('/api/crud/tattoos/create', { imageURL, caption, tags })
      .then((response) => {
        console.log(response);
        setImageURL(response.imageURL);
        setCaption('');
        setTags('');
        setTattoos(response.data.artistCollection);
        setShowArtistWork(true);
        setShowReviews(false);
        setShowBookingForm(false);
        setShowImageUploadForm(false);
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  if (user === null) {
    return <> </>;
  }
  return (
    <div
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
        height: '90VH',
      }}
    >
      <div className="row bg-gradient">
        <div
          className="col-3 offset-2 mt-3 ml-1 "
          style={{ height: '86vh', overflowX: 'auto' }}
        >
          <div className="card text-center bg-dark border border-white border-4 mb-3 ">
            <div className="bg-white border border-dark bg-gradient text-white p-2 rounded m-3 ">
              <h2 className="userHeading text-dark">
                {user.firstName}'s profile
              </h2>
            </div>
            <img
              className="pt-3"
              src={user.profilePicture}
              className="card-img-top rounded mx-auto d-block"
              style={{ width: '200px' }}
            />
            <div className="card-body d-flex flex-column text-align-center justify-content-center align-items-center">
              <p className="border-bottom pb-1" style={{ width: '300px' }}>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>

              <p className="border-bottom pb-3 pt-2" style={{ width: '300px' }}>
                <strong>Bio:</strong> {user.aboutMe}
              </p>
              <p>
                <strong>Tattoo Style/s:</strong>{' '}
                {user.tattooStyle.map((style) => {
                  return (
                    <ul>
                      <li>{style}</li>
                    </ul>
                  );
                })}
              </p>
            </div>
            <button
              className="btn btn-success col-8 mb-2 mx-auto d-block"
              onClick={showArtistWorkButton}
            >
              View work
            </button>
            <button
              className="btn btn-success col-8 mb-2 mx-auto d-block"
              onClick={showReviewsButton}
            >
              Reviews
            </button>

            <button
              className="btn btn-success col-8 mb-2 mx-auto d-block"
              onClick={showBookingFormButton}
            >
              Booking form
            </button>
            {currentUser && user._id === currentUser._id ? (
              <button
                className="btn btn-success col-8 mb-2 mx-auto d-block"
                onClick={showImageUploadFormButton}
              >
                Upload an image
              </button>
            ) : (
              <></>
            )}
            {/* <h2>{currentUser.firstName}</h2>  */}
            {/* {currentUser._id === user._id ? (<button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showImageUploadFormButton}>Upload an image</button> ) : <></>}   */}
            {/* {user._id === currentUser._id ?
                         {/* : <></>} */}
          </div>
        </div>

        {showReviews && (
          <div
            className="col-5 mt-3  mb-3 bg-dark  border border-white border-4"
            style={{ height: '86vh', overflowX: 'auto' }}
          >
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="card shadow bg-dark border-white mt-3">
                <div className="bg-white bg-gradient border-dark col-12 p-2 rounded ">
                  <h2 className="userHeading text-dark">Reviews</h2>
                </div>
                {/* <img
              src="/tattoo-images/tattoo-arm-4.jpg"
              alt="tattoo-girl"
              className="card-img-top"
            ></img> */}

                {/* )} */}
                {reviewArtist.map((review) => {
                  return (
                    <div className="card mt-3 col-6 offset-3 align-content-center mb-3 d-flex flex-column justify-content-center align-items-center bg-dark border-white">
                      <div className="card-body ">
                        <h5 className="card-title userHeading">
                          Username: {review.reviewAuthorUsername}
                        </h5>
                        <p
                          class="starability-result align-items-center d-flex justify-content-center margin-1"
                          data-rating={`${review.rating}`}
                        >
                          Rated: {`${review.rating}`} stars
                        </p>
                        <p className="card-text">Review: {review.reviewText}</p>

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
                <h2 className="mt-4 userHeading">LEAVE A REVIEW</h2>
                {/* {currentUser && ( */}
                <form className="mb-3 col-6 offset-3" onSubmit={handleSubmit}>
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
                  <div>
                    <button className="btn btn-success col-6" type="submit">
                      Submit your review
                    </button>
                  </div>
                  {message && <h4>{message}</h4>}
                </form>
              </div>
            </Fade>
          </div>
        )}

        {showArtistWork && (
          <div
            className="col-5 mt-3 card mb-3 bg-dark border-4 border border-white"
            style={{ height: '86vh', overflowX: 'auto' }}
          >
            {/* <div className="card border-white"> */}
            <div className="bg-white border border-dark bg-gradient col-12 text-white p-2 rounded mb-3 mt-3">
              <h2 className="userHeading text-dark">{user.firstName}'s work</h2>
            </div>
            <div className="d-flex flex-wrap bg-dark">
              {tattoos.map((tattoo) => {
                return (
                  <Fade bottom duration={1000} delay={600} distance="30px">
                    <div
                      className="artist-grid bg-dark"
                      onClick={() => handleTattooShow(tattoo)}
                    >
                      {/* <Link to={`/tattoos/${tattoo._id}`}> */}
                      {tattoo.imageURL && (
                        <img
                          className="img-grid img-thumbnail img-fluid bg-dark"
                          src={tattoo.imageURL}
                          style={{ width: '190px', height: '190px' }}
                        ></img>
                      )}
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        )}

        {showBookingForm && (
          <div
            className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
            style={{ height: '86vh', overflowX: 'auto' }}
          >
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="card shadow mt-3">
                <div className=" bg-gradient col-10 offset-1  text-dark p-2 rounded">
                  <h2 className="userHeading text-dark">
                    Send a booking request
                  </h2>
                </div>
                {/* <img
                  src="/tattoo-images/tattoo-arm-4.jpg"
                  alt="tattoo-girl"
                  className="card-img-top"
                ></img> */}
                <div className="card-body bg-dark">
                  {/* <h3 className="card-title">Send a booking request</h3> */}
                  <form
                    className="bg-dark col-8 offset-2"
                    onSubmit={handleBookingSubmit}
                  >
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Where do you want the tattoo?{' '}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="bodyPart"
                        value={bodyPart}
                        required
                        autoFocus
                        onChange={(e) => setBodyPart(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="tattooSize">
                        Roughly what size would you like it?{' '}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="size"
                        value={tattooSize}
                        required
                        onChange={(e) => setTattooSize(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="tattooDescription">
                        Describe your idea{' '}
                      </label>
                      <textarea
                        cols="30"
                        rows="3"
                        className="form-control"
                        type="text-area"
                        name="size"
                        value={tattooDescription}
                        height="200px"
                        required
                        onChange={(e) => setTattooDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="profilePicture">
                        Add reference images{' '}
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        name="rerefenceImage"
                        onChange={handleFileUpload}
                      />
                      {referenceImage && (
                        <img
                          src={referenceImage}
                          alt=""
                          style={{ height: '200px' }}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-success btn-block col-12"
                        type="submit"
                      >
                        Send request
                      </button>
                    </div>
                    {bookingMessage && <h3>{bookingMessage}</h3>}
                  </form>
                </div>
              </div>
            </Fade>
          </div>
        )}

        {tattooShow && selectedTattoo && (
          <div
            className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
            style={{ height: '83vh', overflowX: 'auto' }}
          >
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="bg-white bg-gradient col-12 text-dark p-2 rounded mt-3 mb-3 border border-dark">
                <h2 className="userHeading text-dark">
                  {user.firstName}'s work
                </h2>
              </div>
              <img
                className="col-10 offset-1 border border-white"
                src={selectedTattoo.imageURL}
              />
              <h5 className="mb-5 col-8 offset-2">{selectedTattoo.caption}</h5>

              {currentUser && currentUser.role === 'User' ? (
                <div className="border border-white col-8 offset-2 mb-5">
                  <h2 className="userHeading">Add to your collection</h2>
                  <form
                    className="mb-3 "
                    onSubmit={handleCollectionSubmit}
                    tattooId={selectedTattoo._id}
                  >
                    <div className="mb-3 col-6 offset-3">
                      <label
                        className="form-label"
                        htmlFor="selectedCollection"
                      >
                        Add to your collection{' '}
                      </label>
                      {/* <input
                            className="form-control"
                            type="text"
                            name="tattooId"
                            value={sele}
                            required
                            autoFocus
                            onChange={(e) => setCollectionTitle(e.target.value)}
                          /> */}
                      <Select
                        name="selectedCollection"
                        components={animatedComponents}
                        isMulti
                        options={collections.map((collection) => {
                          return {
                            value: `${collection.title}`,
                            label: `${collection.title}`,
                          };
                        })}
                        onChange={handleCollectionChange}
                      />
                    </div>
                    <button className="btn btn-success col-3" type="submit">
                      Add
                    </button>
                    {message && <h4>{message}</h4>}
                  </form>
                  <div className="d-flex flex-column align-items-center">
                    <button
                      className="btn btn-success col-3"
                      onClick={showCollectionFormButton}
                    >
                      New collection
                    </button>
                  </div>
                  {showCollectionForm && (
                    <div className="card-body col-6 offset-3  mb-2">
                      <h2 className="userHeading">Create a collection</h2>

                      <form
                        className="mb-3"
                        onSubmit={handleNewCollectionSubmit}
                      >
                        <div className="mb-3">
                          <label className="form-label" htmlFor="username">
                            Collection name:{' '}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={collectionTitle}
                            required
                            autoFocus
                            onChange={(e) => setCollectionTitle(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="username">
                            Description:{' '}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="description"
                            value={collectionDescription}
                            required
                            autoFocus
                            onChange={(e) =>
                              setCollectionDescription(e.target.value)
                            }
                          />
                        </div>

                        <button className="btn btn-success" type="submit">
                          Create
                        </button>
                        {message && <h4>{message}</h4>}
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </Fade>
          </div>
        )}

        {showImageUploadForm && (
          <div
            className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
            style={{ height: '86vh', overflowX: 'auto' }}
          >
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="card shadow mt-3 bg-dark border border-white border-4">
                <div className=" bg-white   text-dark p-2 rounded mb-3">
                  <h2 className="userHeading text-dark">
                    Upload an image of your work
                  </h2>
                </div>

                <form
                  className="bg-dark col-8 offset-2"
                  onSubmit={handleImageUploadSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Image:{' '}
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
                    <label className="form-label" htmlFor="caption">
                      Caption:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="tags">
                      Tags (separate each tag with a comma):{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="tags"
                      // value={tags}
                      onChange={handleTagChange}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-block col-5 mb-5 userHeading"
                    type="submit"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </Fade>
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
