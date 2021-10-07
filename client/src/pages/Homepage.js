import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Homepage(props) {


    const [tattoos, setTattoos] = useState([])

    const getAllTattoos = () => {
		// get request to the server
		axios.get(`$/api/crud`)
			.then(response => {
				console.log(response.data)
				setTattoos(response.data);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => { 
		getAllTattoos();
	}, [])

    console.log(props)
    return (
        <div>
      
            <div>
                <h1>Find and book your new tattoo</h1>
            </div>
            <div>
                <h1>I am...</h1>
                <div>
                    <Link to="/signup">Sign up</Link>
                </div>

                <div className="col-12 d-flex flex-wrap">
                {tattoos.map(tattoo => {
                    return (
                        
                            <div className="p-2">
                                {/* <Link to={`/${artist._id}/artist-profile`}> */}
                                  <img className="artist-image rounded border border-dark shadow" src={tattoo.imageURL} style={{width: "330px", height: "330px"}}></img>
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