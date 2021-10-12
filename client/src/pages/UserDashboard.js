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
    const [showForm, setShowForm] = useState(false);

    const [allCollections, setAllCollections] = useState(true)
    const [thisCollection, setThisCollection] = useState(false)
    const [collectionShow, setCollectionShow] = useState(null)


    const[favouriteStyles, setFavouriteStyles] = useState('')
    const[profilePicture, setProfilePicture] = useState('')

    const [showDashhoard, setShowDashboard] = useState(true)
    const [showEditDashboard, setShowEditDashBoard] = useState(false)



    const tattooStyles = [
		{ value: 'Traditional', label: 'Traditional/Old School' },
		{ value: 'NeoTraditional', label: 'Neo Traditional' },
		{ value: 'Stick & Poke', label: 'Stick & Poke' },
		{ value: 'Tribal', label: 'Tribal' },
		{ value: 'WaterColor', label: 'Water Color' },
		{ value: 'Blackwork', label: 'Blackwork' },
		{ value: 'Realism', label: 'Realism' },
		{ value: 'Japanese', label: 'Japanese' },
		{ value: 'Geometric', label: 'Geometric' },
		{ value: 'MicroTattoo', label: 'Micro Tattoo' },
		{ value: 'Abstract', label: 'Abstract' },
		{ value: '3D', label: '3D' },
		{ value: 'Cartoon', label: 'Cartoon' },
		{ value: 'Portrait', label: 'Portrait' },
		{ value: 'Continuous Line', label: 'Continuous Line' },
		{ value: 'Animal', label: 'Animal' },
		{ value: 'Sketch', label: 'Sketch' },
		{ value: 'Other', label: 'Other' },

	  ]


      const handleFavouriteStyleChange = e => {
		const newValuesArr = e ? e.map(item => item.value) : [];
		setFavouriteStyles(newValuesArr)
	}


    const handleFileUpload = (e) => {
		// const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

		uploadData.append("imageURL", e.target.files[0])

		service
			.handleProfileUpload(uploadData)
			.then(response => {
                console.log('uploading', response.secure_url)
				setProfilePicture(response.secure_url)
			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};


    const showCollection = (id) => {
        console.log(id)
        axios.get(`/api/crud/mycollection/${id}`)
			.then(response => {
                console.log('collection', response.data)
				setCollectionShow(response.data);
                setThisCollection(true)
                setAllCollections(false)
                // setShowDashboard(false)
                setShowEditDashBoard(false);
                console.log(collectionShow)
			})
			.catch(err => console.log(err));
	}


    const showDashboardButton = (e) => {
        e.preventDefault();
        setShowDashboard(true)
        setShowEditDashBoard(false);
        setThisCollection(false);
        }



    const showEditDashboardButton = (e) => {
        e.preventDefault();
        setShowDashboard(false);
        setShowEditDashBoard(true);
        setThisCollection(false);
        }

        const showAllCollectionsButton = (e) => {
            e.preventDefault();
            setShowDashboard(true);
            setShowEditDashBoard(false);
            setThisCollection(false);
            setAllCollections(true);
            }



    const showFormButton = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
    }


//     const getCurrentUser = () => {
//         axios.get(`/api/crud/users`)
//        .then(response => {
//             console.log('userinfoooo', response.data)
//            setCurrentUser(response.data);
//        })
//        .catch(err => console.log(err));
//    }
//    useEffect(() => { 
//        getCurrentUser();
//    }, []) 


    const getUserDashboard = () => {
		// get request to the server
		axios.get(`/api/crud/${props.match.params.id}/user-dashboard`)
			.then(response => {
                console.log('this user', response.data)
				setProfilePicture(response.data.profilePicture)
				setFavouriteStyles(response.data.favouriteStyles)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserDashboard();
	}, [])


    const getAllArtists = () => {
		// get request to the server
		axios.get(`/api/crud/all-artists`)
			.then(response => {
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
				setAppointments(response.data.myAppointments);
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getUserAppointments();
	}, [])





    const handleSubmit = (e) => {
		e.preventDefault();
        axios.put(`/api/crud/${props.match.params.id}/appointments`, {date: date, time: time, location: location, price: price, artist: artist})
        .then(response => {
            getUserAppointments()
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }
    

    const handleUpdateSubmit = (e) => {
		e.preventDefault();
        const requestBody = { favouriteStyles, profilePicture };
        console.log('prof picture', profilePicture)
        axios.put(`/api/crud/${props.match.params.id}/edit-user`, requestBody)
        .then(response => {
            setShowDashboard(true)
            setShowEditDashBoard(false);
            console.log('new image', response.data)
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }


    const deleteCollection = (id) => {
        console.log(id)
        axios.delete(`/api/crud/user-dashboard/collections/${id}`)
        .then(response => {
            console.log('delete collection', response.data)
            setCollections(collections)
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    } 

    

    const deleteAppointment = (date) => {
        console.log(date)
        axios.delete(`/api/crud/user-dashboard/appointments/${date}`)
        .then(response => {
            console.log('delete appointment', response.data)
            setAppointments(response.data.myAppointments)
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    } 

    if(collections === null){
		return<></>
	}

    
    return (
        <div>

        {showDashhoard && (
        <div className="row">
            <div className="col-3 offset-1 mt-3 ml-1">
                <div className="card">
                <div className="bg-dark bg-gradient text-white p-2 rounded">
            <h3>Welcome  {props.user.username}</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
            <img src={profilePicture} alt="profile" style={{ width: '300px' }}/>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
         <p><strong>Your favourite tattoo tyle/s:</strong> {props.user.favouriteStyles.map(style => {
             return <ul>
                         <li>
                             {style}
                         </li>
                    </ul>
                    })} 
                </p>
                <div>
                <button className="btn btn-primary" onClick={showEditDashboardButton}>Edit dashboard</button>
                </div>
                </div>
                <div className="card">
                
            <h1>My Appointments</h1>

            <div className="d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-success mb-4 mt-4 col-6" onClick={showFormButton}>Add a new appointment</button>
            </div>

            {showForm && ( 
            <div className="row">
					<h1 className="text-center">Add a new appointment</h1>
					<div>
						<div className="card shadow">                  
							{/* <img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img> */}
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
            )}



            {appointments.map(appointment => {
               return ( 
                   <div className="d-flex flex-column">
                   <p>Artist:  
                <Link to={`/${appointment.artist._id}/artist-profile`}>
               {appointment.artist.firstName} {appointment.artist.lastName}
               </Link>
               </p>
               <p> Studio: 
               <Link to={`/studio/${appointment.location._id}`}>
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
            </div>
            </div>
            {/* <div> */}
{allCollections &&(
            <div className="col-7 mt-3">
            <div className="card">
            <div className="bg-dark bg-gradient col-12 text-white p-2 rounded">
                <h2>Your collections:</h2>
                </div>
                {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
                {collections.map((collection) => {
                    return (

                          
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    {collection.tattoos.slice(0,4).map(tattoo => {
                        return (
                            <div className="p-1">
                              <img className="collectonThumbnail" src={tattoo.imageURL} style={{width:"100px", height:"100px"}}></img>
                            </div>
                        )
                    })}
                        <button onClick={() => {
                                    showCollection(collection._id)
                                    }} className="btn btn-sm btn-primary">{collection.title}</button>
                    
                            
                    </div>
                            
                     )
                })}
                </div>
            </div>
            )}





          


       
{thisCollection && (
         <div className="col-7 mt-3">
<div className="card">
<div>
    <h2>{collectionShow.title}</h2>
    <p>{collectionShow.description}</p>
    <button className="btn btn-success mb-4 mt-4 col-6" onClick={showAllCollectionsButton}>Back</button>
   {collectionShow !== null ? (

       collectionShow.tattoos.map(image => (
           <div>
           <img src={image.imageURL} style={{width:"300px"}}></img>
           <h5>{image.caption}</h5>
           <p><strong>Done by: </strong> <Link to={`/${image.artist._id}/artist-profile`}>{image.artist.firstName} {image.artist.lastName}</Link></p>
           </div>
       
       ))
   ) : (<></>)}
                </div>
                </div>
                </div>
                )}
           
                </div>
            )}



            {showEditDashboard && (
        <div className="row">
            <div className="col-3 offset-1 mt-3 ml-1">
                <div className="card">
                <div className="bg-dark bg-gradient text-white p-2 rounded">
            <h3>Welcome  {props.user.username}</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
           
            <div className="card-body d-flex flex-column justify-content-center align-items-center">


            <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
            <label className="form-label" htmlFor="profilePicture">Profile picture: </label>
			<input 
				className="form-control"
				type="file"
				name="profilePicture"
				onChange={handleFileUpload}
				/>
				{profilePicture && <img src={profilePicture} alt="" style={{ height: '200px' }} />}
		    </div>
            <div className="mb-3">
				<label className="form-label" htmlFor="favouriteStyles">Favourite tattoo styles: </label>
				<Select 
				name="favouriteStyles"
				components={animatedComponents}
				isMulti
                // value={favouriteStyles}
				options={tattooStyles} 
				onChange={handleFavouriteStyleChange}
				/>
			</div>
            <div className="mb-3">
				<button className="btn btn-success btn-block col-12" type="submit">Update</button>
			</div>
            </form>
            </div>




         <p><strong>Your favourite tattoo tyle/s:</strong> {props.user.favouriteStyles.map(style => {
             return <ul>
                         <li>
                             {style}
                         </li>
                    </ul>
                    })} 
                </p>
                <div>
                <button className="btn btn-primary" onClick={showDashboardButton}>Done</button>
                </div>
                </div>
                <div className="card">
                
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
               <Link to={`/studio/${appointment.location._id}`}>
                {appointment.location.name}
               </Link>
               </p>
               <p>Date: {appointment.date}</p>
               <p>Time: {appointment.time}</p>
               <p>Price: €{appointment.price}</p>
               <button onClick={() => {
                                    deleteAppointment(appointment.date)
                                    }} className="btn btn-sm btn-danger">Delete</button>
               </div>
               )
            })}
            </div>
            </div>
            </div>
            {/* <div> */}

            <div className="col-7 mt-3">
            <div className="card">
            <div className="bg-dark bg-gradient col-12 text-white p-2 rounded">
                <h2>Your collections:</h2>
                </div>
                {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
                {collections.map((collection) => {
                    return (

                          
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    {collection.tattoos.slice(0,4).map(tattoo => {
                        return (
                            <div className="p-1">
                              <img src={tattoo.imageURL} style={{width:"100px", height:"100px"}}></img>
                            </div>
                        )
                    })}
                        <Link to={`/collections/${collection._id}`}>
                            <p>{collection.title}</p>
                        </Link>
                        <button onClick={() => {
                                    deleteCollection(collection._id)
                                    }} className="btn btn-sm btn-danger">Delete</button>
                            
                    </div>
                            
                     )
                })}
                </div>
            </div>





            </div>
            )}


        


            
            
                



            {/* <div className="bg-dark col-12 text-white p-2 rounded">
                <h2>Your collections:</h2>
                </div>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol> */}
  {/* {collectionShow !== null ? (collectionShow.map(image => {
      return (
        
      )
    }))} */}

    {/* {collectionShow !== null ? (collectionShow.map(image => {
        return (
            <img class="d-block w-100" src={image.imageURL} alt="First slide"></img>
        )
    }))}
                )}
                <div> */}
    
  {/* <div class="carousel-inner">
    <div class="carousel-item">
      <img class="d-block w-100" src={image.imageURL} alt="First slide"></img>
    </div>
    
  </div>
  
  
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  )
}))} */}
{/* </div>  */}
            
            
        
                {/* </div>
             </div> */}



         </div>

    )
}



