import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import '../Starability.css'
import {Link} from 'react-router-dom'

export default function ArtistProfile(props) {
    const [user, setUser] = useState({})
    const [tattoos, setTattoos] = useState([]);
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [reviewArtist, setReviewArtist] = useState([])
    const [reviewAuthorUsername, setReviewAuthorUsername] = useState('')

    const API_URL = 'http://localhost:5005'

    const getUser = () => {
        axios.get(`/api/crud/${props.match.params.id}/artist-profile/user`)
        .then(response => {
            setUser(response.data);
        })
        .catch(err => console.log(err));
    }
    useEffect(() => { 
        getUser();
    }, []) 


	const getUserTattoos = () => {
		// get request to the server
		axios.get(`/api/crud/${props.match.params.id}/artist-profile`)
			.then(response => {
				setTattoos(response.data);
                console.log('tattooo', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserTattoos();
	}, [])

    const getProfileReviews = () => {
		// get request to the server
		axios.get(`/api/crud/${props.match.params.id}/artist-profile/reviews`)
			.then(response => {
				setReviewArtist(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getProfileReviews();
	}, [])


    const handleSubmit = (e) => {
		e.preventDefault();
         axios.post(`/api/crud/${props.match.params.id}/artist-profile/reviews`, {reviewText, rating, reviewAuthorUsername})
         .then(response => {
			return response.data;
            // props.history.push(`/${user._id}/artist-profile`)
		})
		.catch(err => {
			return err.response.data;
		});
    }

    const handleDeleteSubmit = (e) => {
		e.preventDefault();

        //  axios.delete(`/api/crud/${props.match.params.id}/artist-profile/reviews/`, {reviewText, rating})
        //  .then(response => {
        //      console.log('data', response.data)
		// 	return response.data;
		// })
		// .catch(err => {
		// 	return err.response.data;
		// });
    }

    return (
        <>
        <div className="row">
            <div className="col-6">
                <div className="card mb-3">
                    <h1>{user.firstName}'s profile</h1>
                    <img src={user.profilePicture} className="card-img-top" style={{width:"200px"}}/>
                        <div className="card-body">
                            <p>About me: {user.aboutMe}</p>

                            <h2>{user.firstName}'s tattoos</h2>
                            {tattoos.map((tattoo) => {
                                return (
                                    <Link to={`/tattoos/${tattoo._id}`}>
                                    <div> <img src={tattoo.imageURL}></img>
                                <p>{tattoo.caption}</p>
                                </div>
                                </Link>
                                )
                            })}
                    </div>          
                </div>
            </div>
          
           {/* <div className="row"> */}
                <div className="col-6">
                    <h2>Leave a review!</h2>
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="mb-3 offset-4">  
                            <fieldset className="starability-fade">
                            <legend>Rating:</legend>
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Username: {review.reviewAuthorUsername}</h5>
                                <p class="starability-result" data-rating={`${review.rating}`}>
                                    Rated: {`${review.rating}`} stars
                                </p>
                            <p className="card-text">Review: {review.reviewText}</p>
                            
                            
                            <form onSubmit={handleDeleteSubmit}>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                )
            })}
            </div>
        {/* </div> */}

        </div>


           
        </>
    )
}
