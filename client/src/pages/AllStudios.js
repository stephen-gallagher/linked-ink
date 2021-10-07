import React from 'react'
import { useState, useRef } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ"



export default function AllArtists(props) {

    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // const [lng, setLng] = useState(0);
    // const [lat, setLat] = useState(0);
    // const [zoom, setZoom] = useState(9);




    const [name, setName] = useState('')
    const [location , setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [artists, setArtists] = useState([])
    const [imageURL, setImageURL]  = useState('')

    const [geometry, setGeometry] = useState({})

    // const getStudio = () => {
	// 	// get request to the server
	// 	axios.get(`/api/crud/studio/${props.match.params.id}`)
	// 		.then(response => {
	// 			console.log('geography',response.data[0].geometry.coordinates);
    //             setName(response.data[0].name)
    //             setLocation(response.data[0].location)
    //             setDescription(response.data[0].description)
    //             setImageURL(response.data[0].imageURL)
    //             setLng(response.data[0].geometry.coordinates[0])
    //             setLat(response.data[0].geometry.coordinates[1])
    //             // setGeometry(response.data[0].geometry)
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// useEffect(() => { 
	// 	getStudio();

	// }, [])
        
    // useEffect(() => {
    //     if(lng !==0 ){
    //     map.current = new mapboxgl.Map({
    //     container: mapContainer.current,
    //     style: 'mapbox://styles/stephengallagher/ckufe62dp408217mvz6kmroo5',
    //     center: [50, 50],
    //     zoom: 14
    //     });
    //     new mapboxgl.Marker()
    //     .setLngLat([lng, lat])
    //     .addTo(map.current)
    //  }
    //     }, [lat]);


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

    //   if(mapContainer === null){
    //     return<></>
    // }


    

    return (
        <div>


            {/* <div className="sidebar"> */}
            {/* </div> */}
                {/* <div ref={mapContainer} className="mapContainer" style={{height:"200px"}}/> */}
            {/* </div> */}






        <div className='mt-5'>
        <h1>Find a Studio</h1>
        <div className="col-6 offset-3">
        <h3>All participating studios are listed below</h3>
        <h5>Would you like to add a new studio? <Link to="/new-studio">Click here</Link></h5>
        </div>

        <input type="text" name="search" id="search" value={search} placeholder="Search By Name" onChange={handleSearchChange}/>


        <div className="mt-5 mb-5 d-flex flex-wrap justify-content-start align-items-start">
       
             {allStudios.map(studio => {
                    return (
                        <div className="col-4 mb-5 offset-1 card bg-dark bg-gradient text-white border-dark" >
                            <div className="row">
                                <div className="col-md-6">
                                    <img className="img-fluid rounded mt-2 mb-2 border-light p-2" src={studio.imageURL} style={{height: "200px"}}></img>
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