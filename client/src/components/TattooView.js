import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

export default function TattooView(props) {

    const [tattoo, setTattoo] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [collections, setCollections] = useState([])


    const getCurrentUser = () => {
		// get request to the server
		axios.get(`/api/crud/users`)
			.then(response => {
				setCurrentUser(response.data);
                console.log('user', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getCurrentUser();
	}, [])


    const getUserCollections = () => {
		// get request to the server
		axios.get(`/api/crud/user/collections`)
			.then(response => {
				setCollections(response.data);
                console.log('user collections', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserCollections();
	}, [])



    const handleSubmit = (e) => {
		e.preventDefault();
         axios.post('/api/crud/collections/new', {title, description})
         .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }

    return (
        <>


<div>
 {collections.map((collection) => {
                                return (
                                <p>{collection.title}</p>
                        
                                )
                            })}

</div>



          <div className="row">
          <h1>Tattoo:</h1> 
            <div className="col-6">
                <div className="card mb-3">
                    <img src={tattoo.imageURL} className="card-img"></img>
                        <div className="card-body">
                        <p>{tattoo.caption}</p>
                        </div>
                    </div>
                </div>
            <div className="col-6">
                <div className="card mb-3">
                        <div className="card-body">
                        <h2>Create a collection</h2>


                        <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label className="form-label" htmlFor="username">Collection name: </label>
						<input
							className="form-control"
							type="text"
							name="title"
							value={title}
							required
							autoFocus
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Description: </label>
						<input
							className="form-control"
							type="text"
							name="description"
							value={description}
							required
							autoFocus
							onChange={e => setDescription(e.target.value)}
						/>
					</div>

                      
                        <button className="btn btn-success col-6" type="submit">Create</button>
                    </form>


                        <button className="btn btn-primary"><Link to={`/${tattoo.artist}/artist-profile`} style={{color:"white"}}>
                            Back to artist profile
                            </Link>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
