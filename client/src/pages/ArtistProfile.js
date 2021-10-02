import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

export default function ArtistProfile(props) {

    const API_URL = 'http://localhost:5005';

    const [tattoos, setTattoos] = useState([]);

	const getUserTattoos = () => {
		// get request to the server
		axios.get(`/api/crud/${props.user._id}/artist-profile`)
			.then(response => {
				setTattoos(response.data);
			})
			.catch(err => console.log(err));
	}
    console.log('thetats',tattoos)
	useEffect(() => { 
		getUserTattoos();
	}, [])

    return (
        <div>
            <h1>{props.user.firstName}'s profile</h1>
            <img src={props.user.profilePicture} style={{ height: '300px' }}/>
            <p>{props.user.aboutMe}</p>
            <h2>{props.user.firstName}'s tattoos</h2>
            {tattoos.map((tattoo) => {
                return <img src={tattoo.imageURL}></img>
                {/* <p>{tattoo.caption}</p> */}
              
            })}
        </div>
    )
}
