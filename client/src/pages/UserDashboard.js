import React from 'react';
import service from '../api/service';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Fade from 'react-reveal/Fade';

export default function UserDashboard(props) {
  console.log('user props', props);
  const animatedComponents = makeAnimated();

  const [collections, setCollections] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(0);
  const [artist, setArtist] = useState(null);
  const [allStudios, setAllStudios] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#a7aba8');
  const [backgroundEditor, setBackgroundEditor] = useState(false);

  const [allCollections, setAllCollections] = useState(true);
  const [thisCollection, setThisCollection] = useState(false);
  const [collectionShow, setCollectionShow] = useState(null);

  const [favouriteStyles, setFavouriteStyles] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [showDashhoard, setShowDashboard] = useState(true);
  const [showEditDashboard, setShowEditDashBoard] = useState(false);

  const [showAppointments, setShowAppointments] = useState(false);
  const [showCollections, setShowCollections] = useState(true);

  const tattooStyles = [
    { value: 'Traditional', label: 'Traditional/Old School' },
    { value: 'NeoTraditional', label: 'Neo Traditional' },
    { value: 'Stick & Poke', label: 'Stick & Poke' },
    { value: 'Tribal', label: 'Tribal' },
    { value: 'WaterColor', label: 'Water Color' },
    { value: 'Blackwork', label: 'Blackwork' },
    { value: 'Realism', label: 'Realism' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Geometric', label: 'Geometric' },
    { value: 'MicroTattoo', label: 'Micro Tattoo' },
    { value: 'Abstract', label: 'Abstract' },
    { value: '3D', label: '3D' },
    { value: 'Cartoon', label: 'Cartoon' },
    { value: 'Portrait', label: 'Portrait' },
    { value: 'Continuous Line', label: 'Continuous Line' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Sketch', label: 'Sketch' },
    { value: 'Other', label: 'Other' },
  ];

  const handleFavouriteStyleChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setFavouriteStyles(newValuesArr);
  };

  const handleFileUpload = (e) => {
    // const uploadData = new FormData()
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleProfileUpload(uploadData)
      .then((response) => {
        console.log('uploading', response.secure_url);
        setProfilePicture(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  const showCollection = (id) => {
    console.log(id);
    axios
      .get(`/api/crud/mycollection/${id}`)
      .then((response) => {
        console.log('collection', response.data);
        setCollectionShow(response.data);
        setThisCollection(true);
        setAllCollections(false);
        // setShowDashboard(false)
        setShowEditDashBoard(false);
        console.log(collectionShow);
      })
      .catch((err) => console.log(err));
  };

  const showDashboardButton = (e) => {
    e.preventDefault();
    setShowDashboard(true);
    setShowEditDashBoard(false);
    setThisCollection(false);
    // setShowAppointments(false);
  };

  const showEditDashboardButton = (e) => {
    e.preventDefault();
    setShowDashboard(false);
    setShowEditDashBoard(true);
    setThisCollection(false);
    // setShowAppointments(false);
  };

  const showAllCollectionsButton = (e) => {
    e.preventDefault();
    setShowDashboard(true);
    setShowEditDashBoard(false);
    setThisCollection(false);
    setAllCollections(true);

    // setShowAppointments(false);
  };

  const showAppointmentsButton = (e) => {
    e.preventDefault();
    // setShowDashboard(false);
    // setShowEditDashBoard(false);
    // setThisCollection(false);
    setAllCollections(false);
    setShowAppointments(true);
    setThisCollection(false);
    console.log('appointments', showAppointments);
  };

  const showCollectionsButton = (e) => {
    e.preventDefault();
    // setShowDashboard(false);
    // setShowEditDashBoard(false);
    // setThisCollection(false);
    setAllCollections(true);
    setShowAppointments(false);
    setThisCollection(false);
  };

  const showFormButton = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  //     const getCurrentUser = () => {
  //         axios.get(`/api/crud/users`)
  //        .then(response => {
  //             console.log('userinfoooo', response.data)
  //            setCurrentUser(response.data);
  //        })
  //        .catch(err => console.log(err));
  //    }
  //    useEffect(() => {
  //        getCurrentUser();
  //    }, [])

  const getUserDashboard = () => {
    // get request to the server
    axios
      .get(`/api/crud/${props.match.params.id}/user-dashboard`)
      .then((response) => {
        console.log('this user', response.data);
        setProfilePicture(response.data.profilePicture);
        setFavouriteStyles(response.data.favouriteStyles);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserDashboard();
  }, []);

  const getAllArtists = () => {
    // get request to the server
    axios
      .get(`/api/crud/all-artists`)
      .then((response) => {
        setAllArtists(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllArtists();
  }, []);

  const handleArtistChange = (e) => {
    setArtist(e.value);
  };

  const handleStudioChange = (e) => {
    setLocation(e.value);
  };

  const getAllStudios = () => {
    // get request to the server
    axios
      .get(`/api/crud/all-studios`)
      .then((response) => {
        setAllStudios(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllStudios();
  }, []);

  const getUserCollections = () => {
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

  const getUserAppointments = () => {
    axios
      .get(`/api/crud/user/appointments`)
      .then((response) => {
        setAppointments(response.data.myAppointments);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserAppointments();
  }, []);

  const handleSubmit = (e) => {
    console.log('price', price);
    e.preventDefault();
    axios
      .put(`/api/crud/${props.match.params.id}/appointments`, {
        date: date,
        time: time,
        location: location,
        price: price,
        artist: artist,
      })
      .then((response) => {
        getUserAppointments();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const requestBody = { favouriteStyles, profilePicture };
    console.log('prof picture', profilePicture);
    axios
      .put(`/api/crud/${props.match.params.id}/edit-user`, requestBody)
      .then((response) => {
        getUserDashboard();
        setShowDashboard(true);
        setShowEditDashBoard(false);

        console.log('new image', response.data);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteCollection = (id) => {
    console.log(id);
    axios
      .delete(`/api/crud/user-dashboard/collections/${id}`)
      .then((response) => {
        console.log('delete collection', response.data);
        setCollections(collections);
        getUserCollections();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteAppointment = (date) => {
    console.log(date);
    axios
      .delete(`/api/crud/user-dashboard/appointments/${date}`)
      .then((response) => {
        console.log('delete appointment', response.data);
        setAppointments(response.data.myAppointments);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  if (collections === null) {
    return <></>;
  }

  return (
    <div
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      {/* <form onSubmit={handleColorChange}> */}

      {/* <button type="Submit">Submit</button> */}
      {/* </form> */}
      {showDashhoard && (
        <div className="column">
          <div className="col-8 offset-2 mt-5 ml-1">
            <div
              className=" d-flex border border-white border-4"
              style={{ background: backgroundColor }}
            >
              <Fade left duration={1000} delay={600} distance="30px">
                <div className="d-flex flex-column p-2">
                  {/* <div className="bg-dark bg-gradient text-white  p-2 rounded"> */}
                  <h3 className="userHeading p-1">
                    Welcome {props.user.username}
                  </h3>
                  {/* </div> */}
                  <div className="d-flex flex-row align-items-center justify-content-center mt-1">
                    <img
                      className="border border-white border-4 mb-2"
                      src={profilePicture}
                      alt="profile"
                      style={{ width: '180px' }}
                    />
                  </div>
                </div>
              </Fade>
              <div className="card-body d-flex justify-content-around align-items-center  ">
                <Fade top duration={1000} delay={600} distance="30px">
                  <div className="vl2"></div>
                  <div className="d-flex flex-column  border-right border-dark p-4 ">
                    <h3 className="userHeading">You live in:</h3>
                    <h4>{props.user.city.toUpperCase()}</h4>
                  </div>
                  <div className="vl2"></div>
                  <div className="d-flex flex-column border-right border-dark p-4">
                    <h3 className="userHeading">
                      Your favourite tattoo style/s:{' '}
                    </h3>
                    {props.user.favouriteStyles.map((style) => {
                      return <h4>{style.toUpperCase()} </h4>;
                    })}
                  </div>
                  <div className="vl2"></div>
                  <div className="d-flex flex-column">
                    <button
                      onClick={showAppointmentsButton}
                      className="btn btn-primary mb-3"
                    >
                      {' '}
                      Appointments
                    </button>
                    <button
                      onClick={showCollectionsButton}
                      className="btn btn-primary mb-3"
                    >
                      {' '}
                      Collections
                    </button>
                    <button
                      className="btn btn-primary mb-3"
                      onClick={showEditDashboardButton}
                    >
                      Edit dashboard
                    </button>
                    {!backgroundEditor && (
                      <button
                        className="btn btn-primary"
                        onClick={() => setBackgroundEditor(true)}
                      >
                        {' '}
                        Profile Color
                      </button>
                    )}
                    {backgroundEditor && (
                      <div>
                        <input
                          className="form-control"
                          style={{ width: '150px' }}
                          type="text"
                          name="color"
                          value={backgroundColor}
                          required
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => setBackgroundEditor(false)}
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </Fade>
              </div>
            </div>
            {showAppointments && (
              <div
                className="card d-flex flex-column  justify-content-around mt-3 border border-white border-4 mb-4"
                style={{
                  background: backgroundColor,
                  height: '55vh',
                  overflowX: 'auto',
                }}
              >
                <Fade bottom duration={1000} delay={600} distance="30px">
                  <h1 className="userHeading mt-3">My Appointments</h1>
                  <div className="d-flex flex-row justify-content-around mt-4">
                    <div>
                      {appointments.map((appointment) => {
                        return (
                          <div className="d-flex flex-column border-bottom border-top border-white p-3">
                            <div className="d-flex">
                              <h5 className="userHeading">
                                Artist:&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                              </h5>
                              <Link
                                className="text-success"
                                to={`/${appointment.artist._id}/artist-profile`}
                              >
                                {' '}
                                {/* <strong> */}
                                {appointment.artist.firstName}{' '}
                                {appointment.artist.lastName}
                                {/* </strong> */}
                              </Link>
                            </div>
                            <div className="d-flex">
                              <h5 className="userHeading">
                                Studio:&nbsp; &nbsp;{' '}
                              </h5>
                              <Link
                                className="text-success"
                                to={`/studio/${appointment.location._id}`}
                              >
                                {appointment.location.name}
                              </Link>
                            </div>
                            <div className="d-flex">
                              <h5 className="userHeading">
                                Date:&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                              </h5>
                              <p>{appointment.date}</p>
                            </div>
                            <div className="d-flex">
                              <h5 className="userHeading">
                                Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </h5>
                              <p>{appointment.time}</p>
                            </div>
                            <div className="d-flex">
                              <h5 className="userHeading">
                                Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'       '}
                              </h5>
                              <p> €{appointment.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div class="vl"></div>

                    <div className="d-flex flex-column justify-content-start align-items-center">
                      <div>
                        <button
                          className="btn btn-success mb-4 col-10"
                          onClick={showFormButton}
                        >
                          Add a new appointment
                        </button>
                      </div>

                      {showForm && (
                        <div className="column mb-4">
                          <h2 className="userHeading text-center">
                            Add a new appointment
                          </h2>
                          <div>
                            <div className="card shadow">
                              {/* <img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img> */}
                              <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="time"
                                    >
                                      Date:{' '}
                                    </label>
                                    <input
                                      className="form-control"
                                      type="date"
                                      name="date"
                                      value={date}
                                      required
                                      autoFocus
                                      onChange={(e) => setDate(e.target.value)}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="time"
                                    >
                                      Time:{' '}
                                    </label>
                                    <input
                                      className="form-control"
                                      type="time"
                                      name="time"
                                      value={time}
                                      required
                                      onChange={(e) => setTime(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="location"
                                    >
                                      Studio:{' '}
                                    </label>
                                    <Select
                                      name="location"
                                      components={animatedComponents}
                                      options={allStudios.map((studio) => {
                                        return {
                                          value: `${studio._id}`,
                                          label: `${studio.name}`,
                                        };
                                      })}
                                      onChange={handleStudioChange}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="artist"
                                    >
                                      Artist:{' '}
                                    </label>
                                    <Select
                                      name="artist"
                                      components={animatedComponents}
                                      options={allArtists.map((artist) => {
                                        return {
                                          value: `${artist._id}`,
                                          label: `${artist.firstName} ${artist.lastName}`,
                                        };
                                      })}
                                      onChange={handleArtistChange}
                                    />
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="price"
                                      >
                                        Price (€):{' '}
                                      </label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        value={price}
                                        required
                                        onChange={(e) =>
                                          setPrice(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <button
                                      className="btn btn-success btn-block col-12"
                                      type="submit"
                                    >
                                      Add
                                    </button>
                                  </div>
                                  {/* {message && (
					<h3>{message}</h3> */}
                                  {/* )} */}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Fade>
              </div>
            )}
          </div>
          {/* <div> */}
          {allCollections && (
            <div
              className="col-8 offset-2 mt-3"
              style={{ background: backgroundColor }}
            >
              <Fade bottom duration={1000} delay={600} distance="30px">
                <div
                  className="card d-flex flex-wrap mb-4 border border-white border-4"
                  style={{ background: backgroundColor }}
                >
                  <div className="bg-dark bg-gradient col-6 offset-3 text-white p-2 rounded mb-3 mt-3">
                    <h2 className="userHeading p-1 ">My collections</h2>
                  </div>
                  {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
                  <div className="d-flex col-12 flex-wrap mb-4">
                    {collections.map((collection) => {
                      return (
                        <div className="d-flex col-4 flex-row flex-wrap justify-content-around mb-4">
                          <div
                            className="d-flex flex-column col-8 flex-wrap p-2 bg-dark border border-white border-4 ml-4"
                            style={{ borderRadius: '15px' }}
                            // style={{
                            //   border: '1px solid lightGrey',
                            //   margin: '20px',
                            //   padding: '15px',
                            // }}
                          >
                            <div className="collectionAlbum d-flex flex-row flex-wrap justify-content-center align-items-center mt-3">
                              {collection.tattoos.slice(0, 4).map((tattoo) => {
                                return (
                                  <div className="album2 d-flex p-1 bg-dark ">
                                    <img
                                      className="collectonThumbnail border border-white"
                                      src={tattoo.imageURL}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '15px',
                                      }}
                                    ></img>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="p-3">
                              <button
                                onClick={() => {
                                  showCollection(collection._id);
                                }}
                                className="btn btn-md btn-primary"
                              >
                                {collection.title}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fade>
            </div>
          )}

          {thisCollection && (
            <div
              className="card d-flex flex-column col-8 offset-2 justify-content-around mt-3 border border-white border-4 mb-4"
              style={{ background: backgroundColor }}
            >
              <Fade bottom duration={1000} delay={600} distance="30px">
                {/* <h1 className="userHeading mt-3">My Appointments</h1> */}
                <div className="bg-dark bg-gradient col-12 text-white p-2 rounded">
                  <h2 className="userHeading">{collectionShow.title}</h2>
                </div>
                <div className="card" style={{ background: backgroundColor }}>
                  <Carousel>
                    {collectionShow !== null ? (
                      collectionShow.tattoos.map((image) => (
                        <div style={{ background: backgroundColor }}>
                          <div className="col-8 offset-2 mt-3">
                            <img
                              className="border border-white border-4"
                              src={image.imageURL}
                              style={{ width: '600px' }}
                            />
                            {/* <p className="legend">{image.caption}</p> */}
                          </div>
                          <p>{image.caption}</p>
                          <Link
                            className="homeHeading"
                            to={`/${image.artist._id}/artist-profile`}
                          >
                            {image.artist.firstName} {image.artist.lastName}
                          </Link>
                          {/* <div>
                          <img src="/tattoo-images/tattoo-arm-1.jpeg" />
                          <p className="legend">Legend 2</p>
                        </div>
                        <div>
                          <img src="/tattoo-images/tattoo-arm-1.jpeg" />
                          <p className="legend">Legend 3</p>
                        </div> */}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </Carousel>

                  {/* <div>
                    <h2>{collectionShow.title}</h2>
                    <p>{collectionShow.description}</p>
                    <button
                      className="btn btn-success mb-4 mt-4 col-6"
                      onClick={showAllCollectionsButton}
                    >
                      Back
                    </button>
                    {collectionShow !== null ? (
                      collectionShow.tattoos.map((image) => (
                        <div>
                          <img
                            src={image.imageURL}
                            style={{ width: '300px' }}
                          ></img>
                          <h5>{image.caption}</h5>
                          <p>
                            <strong>Done by: </strong>{' '}
                            <Link to={`/${image.artist._id}/artist-profile`}>
                              {image.artist.firstName} {image.artist.lastName}
                            </Link>
                          </p>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div> */}
                </div>
              </Fade>
            </div>
          )}
        </div>
      )}

      {showEditDashboard && (
        <div className="column">
          <div
            className="col-8 offset-2 mt-5 ml-1"
            style={{ height: '75vh', overflowX: 'auto' }}
          >
            <div
              className=" d-flex border border-white border-4 justify-content-around"
              style={{ background: backgroundColor }}
            >
              {/* <Fade left duration={1000} delay={600} distance="30px"> */}
              <div className="d-flex flex-column p-2">
                {/* <div className="bg-dark bg-gradient text-white  p-2 rounded"> */}
                <h3 className="userHeading p-1">
                  Welcome {props.user.username}
                </h3>
                <div className="d-flex flex-row align-items-center justify-content-center mt-1">
                  {/* <div className="card-body d-flex flex-column justify-content-center align-items-center"> */}
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="profilePicture">
                        Profile picture:{' '}
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        name="profilePicture"
                        onChange={handleFileUpload}
                      />
                      {profilePicture && (
                        <img
                          src={profilePicture}
                          alt=""
                          style={{ width: '180px' }}
                        />
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="favouriteStyles">
                        Favourite tattoo styles:{' '}
                      </label>
                      <Select
                        name="favouriteStyles"
                        components={animatedComponents}
                        isMulti
                        // value={favouriteStyles}
                        options={tattooStyles}
                        onChange={handleFavouriteStyleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-success btn-block col-12"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
                {/* </Fade> */}

                <p>
                  <strong>Your favourite tattoo tyle/s:</strong>{' '}
                  {props.user.favouriteStyles.map((style) => {
                    return (
                      <ul>
                        <li>{style}</li>
                      </ul>
                    );
                  })}
                </p>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={showDashboardButton}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div></div>
              <div className="card bg-dark">
                <h2 className="userHeading">My Appointments</h2>

                {appointments.map((appointment) => {
                  return (
                    <div>
                      <div className="card shadow">
                        {/* <img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img> */}
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="time">
                                Date:{' '}
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                name="date"
                                value={appointment.date}
                                required
                                autoFocus
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label" htmlFor="time">
                                Time:{' '}
                              </label>
                              <input
                                className="form-control"
                                type="time"
                                name="time"
                                value={appointment.time}
                                required
                                onChange={(e) => setTime(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="location">
                                Studio:{' '}
                              </label>
                              <Select
                                name="location"
                                components={animatedComponents}
                                options={allStudios.map((studio) => {
                                  return {
                                    value: `${studio._id}`,
                                    label: `${studio.name}`,
                                  };
                                })}
                                placeholder={appointment.location.name}
                                onChange={handleStudioChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="artist">
                                Artist:{' '}
                              </label>
                              <Select
                                name="artist"
                                components={animatedComponents}
                                placeholder={`${appointment.artist.firstName} ${appointment.artist.lastName}`}
                                options={allArtists.map((artist) => {
                                  return {
                                    value: `${artist._id}`,
                                    label: `${artist.firstName} ${artist.lastName}`,
                                  };
                                })}
                                onChange={handleArtistChange}
                              />
                              <div className="mb-3">
                                <label className="form-label" htmlFor="price">
                                  Price (€):{' '}
                                </label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="price"
                                  value={appointment.price}
                                  required
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <button
                                className="btn btn-success btn-block col-12 mb-2"
                                type="submit"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => {
                                  deleteAppointment(appointment.date);
                                }}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                            </div>
                            {/* {message && (
					<h3>{message}</h3> */}
                            {/* )} */}
                          </form>
                        </div>
                      </div>
                    </div>

                    /* <div className="d-flex flex-column">
                      <p>
                        Artist:
                        <Link to={`/${appointment.artist._id}/artist-profile`}>
                          {appointment.artist.firstName}{' '}
                          {appointment.artist.lastName}
                        </Link>
                      </p>
                      <p>
                        {' '}
                        Studio:
                        <Link to={`/studio/${appointment.location._id}`}>
                          {appointment.location.name}
                        </Link>
                      </p>
                      <p>Date: {appointment.date}</p>
                      <p>Time: {appointment.time}</p>
                      <p>Price: €{appointment.price}</p>
                      <button
                        onClick={() => {
                          deleteAppointment(appointment.date);
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div> */
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div> */}

          {/* <div className="column"> */}
          <div
            className="col-8 offset-2 mt-5 ml-1 mb-4 border border-white border-4"
            style={{ background: backgroundColor }}
          >
            {/* <div
              className=" d-flex border border-white border-4 justify-content-around"
              style={{ background: backgroundColor }}
            > */}
            {/* <div className="card"> */}
            <div className="bg-dark bg-gradient col-12 text-white p-2 rounded">
              <h2>Your collections:</h2>
            </div>
            {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
            {collections.map((collection) => {
              return (
                <div
                  className="d-flex flex-row flex-wrap justify-content-center align-items-center mt-3"
                  style={{ width: '200' }}
                >
                  {collection.tattoos.slice(0, 4).map((tattoo) => {
                    return (
                      <div className="p-1">
                        <img
                          className="rounded border border-white"
                          src={tattoo.imageURL}
                          style={{ width: '100px', height: '100px' }}
                        ></img>
                      </div>
                    );
                  })}
                  <Link to={`/collections/${collection._id}`}>
                    <p>{collection.title}</p>
                  </Link>
                  <button
                    onClick={() => {
                      deleteCollection(collection._id);
                    }}
                    className="btn btn-sm btn-danger ml-4"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            {/* </div> */}
          </div>
        </div>
      )}

      {/* <div className="bg-dark col-12 text-white p-2 rounded">
                <h2>Your collections:</h2>
                </div>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol> */}
      {/* {collectionShow !== null ? (collectionShow.map(image => {
      return (
        
      )
    }))} */}

      {/* {collectionShow !== null ? (collectionShow.map(image => {
        return (
            <img class="d-block w-100" src={image.imageURL} alt="First slide"></img>
        )
    }))}
                )}
                <div> */}

      {/* <div class="carousel-inner">
    <div class="carousel-item">
      <img class="d-block w-100" src={image.imageURL} alt="First slide"></img>
    </div>
    
  </div>
  
  
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  )
}))} */}
      {/* </div>  */}

      {/* </div>
             </div> */}
    </div>
  );
}
