import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import '../Starability.css'
import {Link} from 'react-router-dom'
import service from '../api/service'

export default function ArtistProfile(props) {
    const [user, setUser] = useState(null)
    const [tattoos, setTattoos] = useState([]);
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [reviewArtist, setReviewArtist] = useState([])
    const [reviewAuthorUsername, setReviewAuthorUsername] = useState('')
    const [currentUser, setCurrentUser] = useState(null)


    const [bodyPart, setBodyPart] = useState('')
    const [tattooSize, setTattooSize] = useState('')
    const [tattooDescription, setTattooDescription] = useState('')
    const [referenceImage, setReferenceImage] = useState('')


    const [showArtistWork, setShowArtistWork] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);

    const showArtistWorkButton = (e) => {
        e.preventDefault();
        setShowArtistWork(true);
        setShowReviews(false);
        setShowBookingForm(false);
    }

    const showReviewsButton = (e) => {
        e.preventDefault();
        setShowReviews(true);
        setShowArtistWork(false);
        setShowBookingForm(false);
        }

    const showBookingFormButton = (e) => {
        e.preventDefault();
        setShowReviews(false);
        setShowArtistWork(false);
        setShowBookingForm(true);
        }




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

    const deleteReview = (id) => {
        console.log('this id', id)
    axios.delete(`/api/crud/artist-profile/reviews/${id}`)
} 



const handleFileUpload = (e) => {
    // const uploadData = new FormData()
console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageURL", e.target.files[0])

    service
        .handleUpload(uploadData)
        .then(response => {
            setReferenceImage(response.secure_url)
        })
        .catch(err => console.log("Error when uploading the file: ", err))
};

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
                        <div className="card-body d-flex flex-column justify-content-start align-items-start offset-3">
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
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showArtistWorkButton}>View work</button>          
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showReviewsButton}>Reviews</button>          
                        <button className="btn btn-success col-8 mb-2 mx-auto d-block" onClick={showBookingFormButton}>Booking form</button>          
                        

                        </div>
            </div>

            {showReviews && ( 
            <div className="col-6 mt-3 card mb-3 bg-secondary bg-gradient">
                <h2 className="mt-4 text-white">LEAVE A REVIEW</h2>
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="mb-3 offset-4">  
                            <fieldset className="starability-fade">
                            <legend className="text-white">Rating:</legend>
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
                            <label className="form-label text-white" htmlFor="body">Your review:</label>
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
            
          
            {showArtistWork && ( 
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
            )}


            {showBookingForm && ( 
            <div className="col-6">
						<div className="card shadow mt-3">
							<img src="/tattoo-images/tattoo-arm-4.jpg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h3 className="card-title">Send a booking request</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label" htmlFor="username">Where do you want the tattoo? </label>
						<input
							className="form-control"
							type="text"
							name="bodyPart"
							value={bodyPart}
							required
							autoFocus
							onChange={e => setBodyPart(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="tattooSize">Roughly what size would you like it? </label>
						<input
							className="form-control"
							type="text"
							name="size"
							value={tattooSize}
							required
							onChange={e => setTattooSize(e.target.value)}
						/>
					</div>
                    <div className="mb-3">
						<label className="form-label" htmlFor="tattooDescription">Describe your idea </label>
						<input
							className="form-control"
							type="text-area"
							name="size"
							value={tattooDescription}
							required
							onChange={e => setTattooDescription(e.target.value)}
						/>
					</div>
                    <div className="mb-3">
						<label className="form-label" htmlFor="profilePicture">Add reference images </label>
						<input 
							className="form-control"
							type="file"
							name="rerefenceImage"
							onChange={handleFileUpload}
							/>
							{referenceImage && <img src={referenceImage} alt="" style={{ height: '200px' }} />}
					</div>
                    <div className="mb-3">
						<button className="btn btn-success btn-block col-12" type="submit">Send request</button>
					</div>
					{/* {message && (
					<h3>{message}</h3>
				)} */}
				</form>
				</div>
				</div>
				</div>
            )}
 

        </div>


           
        </>
    )
}
