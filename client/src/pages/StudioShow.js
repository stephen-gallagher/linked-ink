import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'


export default function StudioShow(props) {
    const [name, setName] = useState('')
    const [location , setLocation] = useState('')
    const [description, setDescription] = useState('')
    // const [geometry, setGeometry] = useState({})

    const getStudio = () => {
		// get request to the server
		axios.get(`/api/crud/studio/${props.match.params.id}`)
			.then(response => {
				console.log(response.data);
                setName(response.data[0].name)
                setLocation(response.data[0].location)
                setDescription(response.data[0].description)
                // setGeometry(response.data[0].geometry)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getStudio();
        // console.log('the studio', studio)
	}, [])


    return (
        <div>
        
            <h1>{name}</h1>
            <h2>{location}</h2>
            <p>{description}</p>
            {/* <p>{geometry}</p> */}
        </div>
    )
}
