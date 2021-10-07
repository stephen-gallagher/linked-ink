import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Homepage(props) {


    const [tattoos, setTattoos] = useState([])

    const getAllTattoos = () => {
		// get request to the server
		axios.get(`/api/crud`)
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
                <img className="w-100"src="/tattoo-images/tattoo-machine-2.png" style={{vw:'100'}}></img>
                <h1>Find and book your new tattoo</h1>
            </div>
            <div classname="d-flex position-absolute">
                <h1>I am...</h1>
                <div>
                    <Link to="/signup">Sign up</Link>
                </div>

               
            </div>
        </div>
    )
}