import React from 'react'
import service from '../api/service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'

export default function UserDashboard(props) {


    const animatedComponents = makeAnimated();

    const [collections, setCollections] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState(null)
    const [price, setPrice] = useState(0)
    const [artist, setArtist] = useState(null)
    const [allStudios, setAllStudios] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const [appointments, setAppointments] = useState([])


    const getAllArtists = () => {
		// get request to the server
		axios.get(`/api/crud/all-artists`)
			.then(response => {
                console.log('all artists', response.data)
				setAllArtists(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getAllArtists();
	}, [])


    const handleArtistChange = (e) => {
        setArtist(e.value)
    }

    const handleStudioChange = (e) => {
        setLocation(e.value)
    }


    const getAllStudios = () => {
		// get request to the server
		axios.get(`/api/crud/all-studios`)
			.then(response => {
				setAllStudios(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getAllStudios();
	}, [])



    const getUserCollections = () => {
		axios.get(`/api/crud/user/collections`)
			.then(response => {
				setCollections(response.data);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserCollections();
	}, [])


    const getUserAppointments = () => {
		axios.get(`/api/crud/user/appointments`)
			.then(response => {
                console.log('appointmnets', response.data.myAppointments)
				setAppointments(response.data.myAppointments);
                console.log('myappointmnet', appointments)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserAppointments();
	}, [])


	if(collections === null){
		return<></>
	}


    const handleSubmit = (e) => {
		e.preventDefault();
        axios.put(`/api/crud/${props.match.params.id}/appointments`, {date: date, time: time, location: location, price: price, artist: artist})
        .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }

    
    return (
        <div>
            <h1>Welcome  {props.user.username}</h1>
            <img src={props.user.profilePicture} alt="profile" style={{ height: '300px' }}/>

            <div>
                <h2>Your collections:</h2>
                {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
                {collections.map((collection) => {
                    return (
                                        
                    <div className="d-flex flex-row">
                        <Link to={`/collections/${collection._id}`}>
                            <p>{collection.title}</p>
                        </Link>
                
                        {/* <img src={collection.tattoos[0].imageURL}></img> */}
                            
                    </div>
                            
                     )
                })}
            </div>



            <div className="col-6">
            <h1>My Appointments</h1>
            {appointments.map(appointment => {
               return ( 
                   <div className="d-flex flex-column">
                   <p>Artist:  
                <Link to={`/${appointment.artist._id}/artist-profile`}>
               {appointment.artist.firstName} {appointment.artist.lastName}
               </Link>
               </p>
               <p> Studio: 
               <Link to={`/studio/${appointment.location.id}`}>
                {appointment.location.name}
               </Link>
               </p>
               <p>Date: {appointment.date}</p>
               <p>Time: {appointment.time}</p>
               <p>Price: €{appointment.price}</p>
               </div>
               )
            })}
            </div>


            
            <div className="row">
					<h1 className="text-center">Add a new appointment</h1>
					<div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
						<div className="card shadow">
							<img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label" htmlFor="time">Date: </label>
						<input
							className="form-control"
							type="date"
							name="date"
							value={date}
							required
							autoFocus
							onChange={e => setDate(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="time">Time: </label>
						<input
							className="form-control"
							type="time"
							name="time"
							value={time}
							required
							onChange={e => setTime(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="location">Studio: </label>
						<Select 
						name="location"
						components={animatedComponents}
						options={allStudios.map((studio) => {
                            return (
                            {value: `${studio._id}`, label: `${studio.name}`}           
                            )
                            })}
						onChange={handleStudioChange}
						/>
					</div>
                    <div className="mb-3">
						<label className="form-label" htmlFor="artist">Artist: </label>
						<Select 
						name="artist"
						components={animatedComponents}
						options={allArtists.map((artist) => {
                            return (
                            {value: `${artist._id}`, label: `${artist.firstName} ${artist.lastName}`}           
                            )
                            })}
						onChange={handleArtistChange}
						/>
                        <div className="mb-3">
						<label className="form-label" htmlFor="price">Price (€): </label>
						<input
							className="form-control"
							type="number"
							name="price"
							value={price}
							required
							onChange={e => setPrice(e.target.value)}
						/>
					</div>
					</div>
					<div className="mb-3">
						<button className="btn btn-success btn-block col-12" type="submit">Add</button>
					</div>
					{/* {message && (
					<h3>{message}</h3> */}
				{/* )} */}
				</form>
				</div>
				</div>
				</div>
				</div>
			</div>




        // </div>

    )
}
