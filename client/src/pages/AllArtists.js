import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function AllArtists() {




    const [allArtists, setAllArtists] = useState([]);
    const [nameSearch, setNameSearch] = useState('')
    const [styleSearch, setStyleSearch] = useState('')

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


    const handleNameSearchChange = event => {
        event.preventDefault()
        setNameSearch(event.target.value)
        let newList = allArtists.filter((artist) => {
          return `${artist.firstName}${artist.lastName}`.toLowerCase().includes(nameSearch.toLowerCase())
        })
        setAllArtists(newList)
      }

      if(allArtists === []){
		return<></>
	}

    const handleStyleSearchChange = event => {
        event.preventDefault()
        setStyleSearch(event.target.value)
        let newList = allArtists.filter((artist) => {
          return `${artist.tattooStyle}`.toLowerCase().includes(styleSearch.toLowerCase())
        })
        setAllArtists(newList)
      }

      if(allArtists === []){
		return<></>
	}


    return (
        <div className='mt-5'>
        <h1>Find an Artist</h1>
        <div className="col-6 offset-3">
        <h4>Browse through the list of our registered artists to find the perfect match for your next tattoo idea. Click on the image below to view their profile</h4>
        </div>
        
        <div className="d-flex p5 justify-content-center align-items-center ">
        <div className="p5">
        <label>Search by name:&nbsp; </label>
        <input type="text" name="search" id="search" value={nameSearch} placeholder="e.g John Smith" onChange={handleNameSearchChange}/>
        </div>
        <div>
        <label>Search by style: &nbsp;</label>
        <input type="text" name="search" id="search" value={styleSearch} placeholder="e.g Traditional" onChange={handleStyleSearchChange}/>
      </div>
      </div>

        <div className="col-10 offset-1 d-flex flex-wrap justify-content-center">
             {allArtists.map(artist => {
                    return (
                        
                            <div className="p-4">
                                <Link to={`/${artist._id}/artist-profile`}>
                                  <img className="artist-image rounded border border-dark shadow" src={artist.profilePicture} style={{width: "300px", height: "400px"}}></img>
                                    <p> {artist.firstName} {artist.lastName}</p>
                                    </Link> 
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                    <p><strong>Style/s:  </strong></p>
                                    {artist.tattooStyle.map(style => {
                                        return (
                                            <p> &nbsp; {style} | </p>
                                        )
                                    })}
                                    </div>
                          
                        </div>
                    )
                })
             }
             </div>
        </div>
    )
}
