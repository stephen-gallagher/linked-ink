import React from 'react'
import service from '../api/service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserDashboard(props) {

    const [collections, setCollections] = useState([])

    const getUserCollections = () => {
		axios.get(`/api/crud/user/collections`)
			.then(response => {
                console.log('the tattoo data', response.data)
				setCollections(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserCollections();
	}, [])


    console.log(props)
    return (
        <div>
            <h1>Welcome  {props.user.username}</h1>
            <img src={props.user.profilePicture} alt="profile" style={{ height: '300px' }}/>

            <div>
                <h2>Your collections:</h2>
                {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
                {collections.map((collection) => {
                    return (
                                        
                    <div className="d-flex flex-row">
                        <Link to={`/collections/${collection._id}`}>
                            <p>{collection.title}</p>
                        </Link>
                
                        {/* <img src={collection.tattoos[0].imageURL}></img> */}
                            
                    </div>
                            
                     )
                })}
            </div>
        </div>

    )
}
