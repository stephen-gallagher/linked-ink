import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Homepage(props) {
  const [tattoos, setTattoos] = useState([]);
  const [search, setSearch] = useState('');

  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [tattooShow, setTattooShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [message, setMessage] = useState('');

  const animatedComponents = makeAnimated();

  const getAllTattoos = () => {
    // get request to the server
    axios
      .get(`/api/crud/tattoos`)
      .then((response) => {
        console.log('tattoos', response.data);
        setTattoos(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTattoos();
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

  const handleTattooShow = (tattoo) => {
    console.log('selected yeah', tattoo);
    setSelectedTattoo(tattoo);
    setTattooShow(true);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  let newList = tattoos.filter((tattoo) => {
    return `${tattoo.tags}`.toLowerCase().includes(search.toLowerCase());
  });

  const handleCollectionChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setSelectedCollection(newValuesArr);
    console.log('the new array', newValuesArr);
    console.log('the state', selectedCollection);
  };

  const showCollectionFormButton = (e) => {
    e.preventDefault();
    setShowCollectionForm(!showCollectionForm);
  };

  const handleCollectionSubmit = (e) => {
    e.preventDefault();
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

  console.log(props);
  return (
    <div
      className="pt-5 background"
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      <Fade top duration={1000} delay={600} distance="30px">
        <div className="border border-white border-4 col-6 offset-3 mb-3 ">
          <h1 className="exploreHeadingText mt-4">Explore</h1>
          <div className="col-6 offset-3">
            <h4 className="text-dark">
              Browse through the list of images below to find inspiration for
              your next tattoo
            </h4>
            <br />
          </div>
          <h3 className="userHeading">Click an image for more information</h3>
          <label className="mt-4 p-2 text-dark">
            Search through the images using keywords:{' '}
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            placeholder="Search By Name"
            onChange={handleSearchChange}
          />
          {/* if({search} !== ''){ */}
          <h4 className="text-dark userHeading mt-3">
            Showing search results for: "{search}"
          </h4>
          {/* } */}
        </div>
      </Fade>
      <div>
        <div
          className="col-8 offset-2 d-flex flex-wrap justify-content-center pb-3 pt-3 mb-5 border border-white border-4"
          style={{ borderRadius: '25px', background: '#02060d' }}
        >
          {newList.map((tattoo) => {
            return (
              <Fade bottom duration={1000} delay={600} distance="30px">
                <div className="p-1">
                  <div className="artist-grid">
                    {/* <Link to={`/${artist._id}/artist-profile`}> */}
                    {/* <Link to={`/tattoos/${tattoo._id}`}> */}
                    {tattoo.imageURL && (
                      <img
                        className="img-grid artist-image border border-white shadow"
                        src={tattoo.imageURL}
                        style={{
                          width: '240px',
                          height: '240px',
                          borderRadius: '15px',
                        }}
                        onClick={() => handleTattooShow(tattoo)}
                      ></img>
                    )}
                    {/* <div className="tattooOverlay"> */}
                    {/* <div className="artistInformation">
                          {' '}
                          <h2 className="exploreHeadingText">
                            {' '} */}

                    {/* </h2> */}
                    {/* {artist.tattooStyle.map((style) => {
                          return <p> &nbsp; {style}. </p>;
                        })} */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* </Link> */}
                    {/* <p> {artist.firstName} {artist.lastName}</p> */}
                    {/* </Link>  */}
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
      {/* <div
        className="bg-dark"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      >
        <h1>Hello!!</h1>
      </div> */}

      {tattooShow && selectedTattoo && (
        <Fade top duration={1000} delay={600} distance="30px">
          <div
            className="col-5 mt-3 card mb-3 bg-dark sticky border-white"
            style={{ position: 'absolute', top: '50%', left: '30%' }}
          >
            <div className="bg-dark bg-gradient col-12 text-white p-2 rounded d-flex justify-content-between">
              <div></div>
              <h2 className="userHeading">
                {' '}
                {selectedTattoo.artist.firstName}{' '}
                {selectedTattoo.artist.lastName}
              </h2>
              {/* <div> */}
              <button
                className="d-flex flex-end text-dark"
                style={{ height: '28px' }}
                onClick={() => setTattooShow(false)}
              >
                X
              </button>
              {/* </div> */}
            </div>
            <img
              className="col-10 offset-1 border border-white"
              src={selectedTattoo.imageURL}
            />
            <h3 className="p-3" style={{ fontStyle: 'italic' }}>
              {selectedTattoo.caption}
            </h3>

            {currentUser && (
              <div className="border border-white col-8 offset-2 mb-3 pt-3 pb-3">
                <h2 className="userHeading">Add to your collection</h2>
                <form className="mb-3 " onSubmit={handleCollectionSubmit}>
                  <div className="mb-3 col-6 offset-3">
                    <label className="form-label" htmlFor="selectedCollection">
                      Add to your collection{' '}
                    </label>
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

                    <form className="mb-3" onSubmit={handleNewCollectionSubmit}>
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
            )}
            <h3 className="userHeading">
              Visit {selectedTattoo.artist.firstName}'s profile{' '}
              <Link to={`/${selectedTattoo.artist._id}/artist-profile`}>
                here
              </Link>
            </h3>
          </div>
        </Fade>
      )}
    </div>
  );
}
