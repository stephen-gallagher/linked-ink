import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'

export default function TattooView(props) {

    const [showForm, setShowForm] = useState(false);

    const showFormButton = () => {
    setShowForm(!showForm);
    }


    const [tattoo, setTattoo] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState([])


    const getCurrentUser = () => {
		// get request to the server
		axios.get(`/api/crud/users`)
			.then(response => {
				setCurrentUser(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getCurrentUser();
	}, [])

    const getTattoo = () => {
		// get request to the server
		axios.get(`/api/crud/tattoos/${props.match.params.id}`)
			.then(response => {
				setTattoo(response.data);
                console.log('tattoo', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getTattoo();
	}, [])


    const getUserCollections = () => {
		// get request to the server
		axios.get(`/api/crud/user/collections`)
			.then(response => {
				setCollections(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserCollections();
	}, [collections])
    // make that dynamic (collections)


    const handleCollectionChange = e => {
		const newValuesArr = e ? e.map(item => item.value) : [];
		setSelectedCollection(newValuesArr)
		console.log('the new array', newValuesArr)
        console.log('the state', selectedCollection)
	}

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

    const handleCollectionSubmit = (e) => {
		e.preventDefault();
        axios.put(`/api/crud/tattoos/${props.match.params.id}`, {selectedCollection: selectedCollection})
        .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }

    const animatedComponents = makeAnimated();


    return (

        <>
          <div className="row">
          <h1>Artist's collection</h1> 
            <div className="col-5 offset-1">
                <div className="card mb-3">
                    <img src={tattoo.imageURL} className="card-img"></img>
                        <div className="card-body">
                        <h4>{tattoo.caption}</h4>
                        {/* <p><strong>Tags: </strong></p>
                        {tattoo.tags.map(tag => {
                            return <p>{tag}</p>
                        })} */}
                        </div>
                    </div>
                </div>
            <div className="col-6">
                <div className="card mb-3">

                <h2>Add to your collection</h2>
                    <form className="mb-3" onSubmit={handleCollectionSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="selectedCollection">Add to your collection </label>
                            <Select 
                            name="selectedCollection"
                            components={animatedComponents}
                            isMulti
                            options={collections.map((collection) => {
                            return (
                            {value: `${collection.title}`, label: `${collection.title}`}           
                            )
                            })}
                            onChange={handleCollectionChange}
                            />
                        </div>
                        <button className="btn btn-success col-6" type="submit">Add</button>
                    </form>

                    <form>
                    <button className="btn btn-primary col-6" onClick={showFormButton}>Create a new collection</button>
                    </form>
                

                    {showForm && ( 
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
                    

            
                        </div>
                        )}
                        <div>
                        <button className="btn btn-danger col-6 mt-5"><Link to={`/${tattoo.artist}/artist-profile`} style={{color:"white"}}>
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
