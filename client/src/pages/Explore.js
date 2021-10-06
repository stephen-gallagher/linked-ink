import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Homepage(props) {

    const API_URL = 'http://localhost:5005'

    const [tattoos, setTattoos] = useState([])
    const [search, setSearch] = useState('')

    const getAllTattoos = () => {
		// get request to the server
		axios.get(`${API_URL}/api/crud`)
			.then(response => {
				console.log(response.data)
				setTattoos(response.data);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => { 
		getAllTattoos();
	}, [])


    const handleSearchChange = event => {
        event.preventDefault()
        setSearch(event.target.value)
        let newList = tattoos.filter((tattoo) => {
          return `${tattoo.tags}`.toLowerCase().includes(search.toLowerCase())
        })
        setTattoos(newList)
      }



    console.log(props)
    return (
        <div>
      
            <div className='mt-5'>
                <h1>Explore</h1>
                <h2>Browse through the list of images below to find inspiration for your next tattoo</h2>
                <h3>Click an image for more information</h3>
                <label className="mt-4 p-2">Search through the images using keywords: </label>
                <input type="text" name="search" id="search" value={search} placeholder="Search By Name" onChange={handleSearchChange}/>
                {/* if({search} !== ''){ */}
                <p>Showing search results for: "{search}"</p>
            {/* } */}
            </div>
            <div>
             

                <div className="col-12 d-flex flex-wrap">
                {tattoos.map(tattoo => {
                    return (
                        
                            <div className="p-2">
                                {/* <Link to={`/${artist._id}/artist-profile`}> */}
                                <Link to={`/tattoos/${tattoo._id}`}>
                                  <img className="artist-image rounded border border-dark shadow" src={tattoo.imageURL} style={{width: "330px", height: "330px"}}></img>
                                  </Link>
                                    {/* <p> {artist.firstName} {artist.lastName}</p> */}
                                {/* </Link>  */}
                          
                        </div>
                    )
                })
             }
             </div>
               
            </div>
        </div>
    )
}
