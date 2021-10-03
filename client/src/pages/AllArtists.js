import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

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
        <div>
        <h1>Find an Artist</h1>
             {allArtists.map(artist => {
                    return (
                        <div>
                            <OverlayTrigger 
                            trigger="hover" 
                            placement="right" 
                            overlay={<div><Popover>
          <Popover.Title as="h3">(artist.firstName)</Popover.Title>
          <Popover.Content>
              The quick brown fox jumps over the lazy dog!
          </Popover.Content>
        </Popover></div>}
                            >
                            <img className="mt-5" src={artist.profilePicture} style={{height: "300px"}}></img>
                            </OverlayTrigger>
                        </div>
                    )
                })
             }
        </div>
    )
}
