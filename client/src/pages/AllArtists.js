import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function AllArtists() {




    const [allArtists, setAllArtists] = useState([]);

    const getAllArtists = () => {
		// get request to the server
		axios.get(`/api/crud/all-artists`)
			.then(response => {
				setAllArtists(response.data);
			})
			.catch(err => console.log(err));
	}
    console.log('theArtists',allArtists)
	useEffect(() => { 
		getAllArtists();
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
        <div className='mt-5'>
        <h1>Find an Artist</h1>
        <div className="col-6 offset-3">
        <h4>Browse through the list of our registered artist to find the perfect match for your next tattoo idea. Click on the image below to view their profile</h4>
        </div>
        <div className="col-10 offset-1 d-flex flex-wrap">
             {allArtists.map(artist => {
                    return (
                        
                            <div className="p-5">
                                <Link to={`/${artist._id}/artist-profile`}>
                                  <img className="artist-image rounded border border-dark shadow" src={artist.profilePicture} style={{width: "300px", height: "400px"}}></img>
                                    <p> {artist.firstName} {artist.lastName}</p>
                                </Link> 
                          
                        </div>
                    )
                })
             }
             </div>
        </div>
    )
}
