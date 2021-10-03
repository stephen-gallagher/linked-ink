import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function AllArtists() {


    const [allStudios, setAllStudios] = useState([]);

    const getAllStudios = () => {
		// get request to the server
		axios.get(`/api/crud/all-studios`)
			.then(response => {
				setAllStudios(response.data);
			})
			.catch(err => console.log(err));
	}
    console.log('theStudios',allStudios)
	useEffect(() => { 
		getAllStudios();
	}, [])

    // const popover = (
    //     <Popover>
    //       <Popover.Title as="h3">(allArtists.name)</Popover.Title>
    //       <Popover.Content>
    //           The quick brown fox jumps over the lazy dog!
    //       </Popover.Content>
    //     </Popover>
    //   );
    return (
        <div>
        <Link to="/new-studio">Add a new Studio</Link>
        <h1>Find a Studio</h1>
             {allStudios.map(studio => {
                    return (
                        <div>
                            <img className="mt-5" src={studio.imageURL} style={{height: "300px"}}></img>
                        </div>
                    )
                })
             }
        </div>
    )
}