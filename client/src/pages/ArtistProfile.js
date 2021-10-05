import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import '../Starability.css'
import {Link} from 'react-router-dom'

export default function ArtistProfile(props) {
    const [user, setUser] = useState(null)
    const [tattoos, setTattoos] = useState([]);
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [reviewArtist, setReviewArtist] = useState([])
    const [reviewAuthorUsername, setReviewAuthorUsername] = useState('')
    const [currentUser, setCurrentUser] = useState(null)

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


    const getCurrentUser = () => {
        axios.get(`/api/crud/users`)
       .then(response => {
            console.log('user', response.data)
           setCurrentUser(response.data);
       })
       .catch(err => console.log(err));
   }
   useEffect(() => { 
       getCurrentUser();
   }, []) 


	const getUserTattoos = () => {
		// get request to the server
		 axios.get(`/api/crud/${props.match.params.id}/artist-profile`)
			.then(response => {
				setTattoos(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserTattoos();
	}, [])

    const getProfileReviews =  () => {
		// get request to the server
		 axios.get(`/api/crud/${props.match.params.id}/artist-profile/reviews`)
			.then(response => {
				setReviewArtist(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getProfileReviews();
	}, [reviews])


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

    const deleteReview = (id) => {
        console.log('this id', id)
    axios.delete(`/api/crud/${props.match.params.id}/artist-profile/reviews/${id}`)
} 
    // const handleDeleteSubmit = (e) => {
	// 	e.preventDefault();
    //     fetchData()
    //      axios.delete(`/api/crud/${props.match.params.id}/artist-profile/reviews/reviewID`, {reviewText, rating})
    //      .then(response => {
    //          console.log('data', response.data)
	// 		return response.data;
	// 	})
	// 	.catch(err => {
	// 		return err.response.data;
	// 	});
    // }
	if(user === null){
		return<></>
	}
    return (
        <>
        <div className="row">
            <div className="col-4 offset-1 mt-3 ml-1">
                <div className="card mb-3">
                    <h1>{user.firstName}'s profile</h1>
                    <img src={user.profilePicture} className="card-img-top rounded mx-auto d-block" style={{width:"200px"}}/>
                        <div className="card-body">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Bio:</strong> {user.aboutMe}</p>
                            <p><strong>Tattoo Style/s:</strong> {user.tattooStyle.map(style => {
                                return <ul>
                                            <li>
                                                {style}
                                            </li>
                                        </ul>
                            })} 
                                 </p>

                        </div>
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block">View work</button>          
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block">Reviews</button>          
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block">Booking form</button>          
                        
            </div>
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
                            
                            
                            {/* ({review.reviewAuthor} === {currentUser._id} ?  */}
                                <button onClick={() => {
                                    deleteReview(review._id)
                                    }} className="btn btn-sm btn-danger">Delete</button>
                            
                        </div>
                    </div>
                )
            })}
            </div>
          
           {/* <div className="row"> */}
                <div className="col-6 mt-3 card mb-3">

                <h2>{user.firstName}'s tattoos</h2>
                <div className='d-flex flex-wrap'>
                            {tattoos.map((tattoo) => {
                                return (
                                    <div className=""> 
                                        <Link to={`/tattoos/${tattoo._id}`}>
                                        
                                            <img className="img-thumbnail img-fluid" src={tattoo.imageURL} style={{width:"220px", height:"220px"}}></img>                                        
                                        </Link>
                                        </div>
                                    
                                )
                            })}
                            </div>


  
            </div>
 

        </div>


           
        </>
    )
}
