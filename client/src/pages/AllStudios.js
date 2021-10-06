import React from 'react'
import { useState, useRef } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'



export default function AllArtists() {



    const [allStudios, setAllStudios] = useState([]);
    const [search, setSearch] = useState('')

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


    const handleSearchChange = event => {
        event.preventDefault()
        setSearch(event.target.value)
        let newList = allStudios.filter((studio) => {
          return `${studio.name}`.toLowerCase().includes(search.toLowerCase())
        })
        setAllStudios(newList)
      }

    return (
        <div>


        






        <div className='mt-5'>
        <h1>Find a Studio</h1>
        <div className="col-6 offset-3">
        <h3>All participating studios are listed below</h3>
        <h5>Would you like to add a new studio? <Link to="/new-studio">Click here</Link></h5>
        </div>

        <input type="text" name="search" id="search" value={search} placeholder="Search By Name" onChange={handleSearchChange}/>


        <div className="mt-5 mb-5 d-flex flex-wrap">
       
             {allStudios.map(studio => {
                    return (
                        <div className="col-5 mb-5 offset-1 card bg-dark bg-gradient text-white border-dark" >
                            <div className="row">
                                <div className="col-md-6">
                                    <img className="img-fluid rounded mt-2 mb-2 border-light" src={studio.imageURL} style={{height: "200px"}}></img>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body mt-5">
                                        <h4 className="card-title"> {studio.name}</h4>
                                        <p className="card-text"> {studio.location}</p>
                                        <button className='btn btn-light text-dark'><Link className="text-dark" to={`/studio/${studio._id}`}>View this studio</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
             }
            
             </div>
        </div>
        </div>
    )
}