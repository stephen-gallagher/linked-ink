import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
// import MapboxGL from "@react-native-mapbox-gl/maps";
import mapboxgl from 'mapbox-gl'
import {Link} from 'react-router-dom'


mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ"

export default function StudioShow(props) {


    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [reviewArtist, setReviewArtist] = useState([])
    const [reviewAuthorUsername, setReviewAuthorUsername] = useState('')

    const [showArtists, setShowArtists] = useState(true);
    const [showReviews, setShowReviews] = useState(false);

    const showArtistsButton = (e) => {
        e.preventDefault();
        setShowArtists(true);
        setShowReviews(false);
    }

    const showReviewsButton = (e) => {
        e.preventDefault();
        setShowArtists(false);
        setShowReviews(true);
        }
    
    
    // const mapContainer = React.createRef()

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

 
    const getProfileReviews =  () => {
		// get request to the server
		 axios.get(`/api/crud/studio/${props.match.params.id}/reviews`)
			.then(response => {
                console.log('reviews', response.data)
				setReviewArtist(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getProfileReviews();
	}, [])


    const handleReviewSubmit = (e) => {
		e.preventDefault();
         axios.post(`/api/crud/studio/${props.match.params.id}/reviews`, {reviewText, rating, reviewAuthorUsername})
         .then(response => {
             console.log('reviewData', response.data)
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }

    const [name, setName] = useState('')
    const [location , setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [artists, setArtists] = useState([])
    const [imageURL, setImageURL]  = useState('')

    // const [geometry, setGeometry] = useState({})

    const getStudio = () => {
		// get request to the server
		axios.get(`/api/crud/studio/${props.match.params.id}`)
			.then(response => {
				console.log('geography',response.data[0].geometry.coordinates);
                setName(response.data[0].name)
                setLocation(response.data[0].location)
                setDescription(response.data[0].description)
                setImageURL(response.data[0].imageURL)
                setLng(response.data[0].geometry.coordinates[0])
                setLat(response.data[0].geometry.coordinates[1])
                // setGeometry(response.data[0].geometry)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getStudio();

	}, [])


    const getStudioArtists = () => {
		// get request to the server
		 axios.get(`/api/crud/studios/${props.match.params.id}`)
			.then(response => {
				setArtists(response.data);
                console.log('studioartists', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getStudioArtists();
	}, [])



       useEffect(() => {
        if(lng !==0 ){
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/stephengallagher/ckufe62dp408217mvz6kmroo5',
        center: [lng, lat],
        zoom: 14
        });
        new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current)
    
    }
        }, [lat]);


        const handleSubmit = (e) => {
            e.preventDefault();
            axios.put(`/api/crud/studio/${props.match.params.id}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return err.response.data;
            });
        }
    

        if(mapContainer === null){
            return<></>
        }

        if(name === '') {
            return <></>
        }


        const deleteReview = (id) => {
            console.log('this id', id)
        axios.delete(`/api/crud/artist-profile/reviews/${id}`)
    } 

    return (

        <div>

            
            {/* <div className="col-6"> */}
            <div className="sidebar">
            {/* </div> */}
                <div ref={mapContainer} className="mapContainer" style={{height:"200px"}}/>
            </div>
           
            <div className="row">



            <div className="col-4 offset-1 mt-3 ml-1">
                <div className="card mb-3">
                    
                    <img src={imageURL} className="card-img-top rounded mx-auto d-block mt-3" style={{width:"250px"}}/>
                    <h2 className="card-title">{name}</h2>
                    <h5>{location}</h5>
                        <div className="card-body d-flex flex-column justify-content-start align-items-start p-5">
                            
                            <p><strong>About:</strong> {description}</p>
                        </div>
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showArtistsButton}>Artists at the studio</button>          
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showReviewsButton}>Reviews</button> 
                        

                        </div>
            </div>



            {/* <div className="col-6">
            <h1>{name}</h1>
            <h2>{location}</h2>
            <p>{description}</p>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-primary">Join this studio</button>
            </form>
            </div> */}

            {showArtists && ( 
            <div className="col-6 mt-3 mb-3">
            <div className="card">
            <div className="bg-dark col-12 text-white p-2 rounded">
            <h4>Artists at this studio</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-primary mt-3">Join this studio</button>
            </form>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
        
            {artists.map(artist => {
                    return (
                        
                            <div className="p-2">
                                <Link to={`/${artist._id}/artist-profile`}>
                                  <img className="artist-image rounded border border-dark shadow" src={artist.profilePicture} style={{width: "150px", height: "250px"}}></img>
                                    <p> {artist.firstName} {artist.lastName}</p>
                                </Link> 
                          
                        </div>
                    )
                })
             }
             </div>
             </div>
             </div>
            )}


            {showReviews && ( 
            <div className="col-6 mt-3 card mb-3">
                <h2 className="mt-4">LEAVE A REVIEW</h2>
                    <form className="mb-3" onSubmit={handleReviewSubmit}>
                        <div className="mb-3 offset-4">  
                            <fieldset className="starability-fade">
                    w        <legend>Rating:</legend>
                            <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" checked aria-label="No rating." />
                            <input type="radio" id="first-rate1" name="review[rating]" value="1" onChange={e => setRating(e.target.value)}/>
                            <label for="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="review[rating]" value="2" onChange={e => setRating(e.target.value)}/>
                            <label for="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="review[rating]" value="3" onChange={e => setRating(e.target.value)}/>
                            <label for="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="review[rating]" value="4" onChange={e => setRating(e.target.value)}/>
                            <label for="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="review[rating]" value="5" onChange={e => setRating(e.target.value)}/>
                            <label for="first-rate5" title="Amazing">5 stars</label>
                            </fieldset>

                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="body">Your review:</label>
                            <textarea 
                            className= "form-control" 
                            name="review[body]" 
                            cols="30" 
                            rows="3" 
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            required>

                            </textarea>
                        </div>
                        <button className="btn btn-success col-6" type="submit">Submit your review</button>
                    </form>
            {reviewArtist.map(review => {
                return (
                    <div className="card col-10 align-content-center mb-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="card-body">
                            <h5 className="card-title">Username: {review.reviewAuthorUsername}</h5>
                                <p class="starability-result" data-rating={`${review.rating}`}>
                                    Rated: {`${review.rating}`} stars
                                </p>
                            <p className="card-text">Review: {review.reviewText}</p>
                            
                            
                            {/* ({review.reviewAuthor} === {currentUser._id} ?  */}
                                <button onClick={() => {
                                    deleteReview(review._id)
                                    }} className="btn btn-sm btn-danger">Delete</button>
                            
                        </div>
                    </div>
                )
            })}
            </div>
            )}
      


            
            </div>

            
        </div>
    )
}
