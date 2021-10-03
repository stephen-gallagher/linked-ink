import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios';
import service from '../api/service'
import styled from 'styled-components'


export default function Signup(props) {

	const [name, setName] = useState('');
    const [location, setLocation] = useState('')
    const [description, setDestcription] = useState('')


	const handleTattooStyleChange = (e) => {
		const newValuesArr = e ? e.map(item => item.value) : [];
		// setTattooStyle({value: e.target.value})
		setTattooStyle(newValuesArr)
		// console.log()
	}

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
			.handleUpload(uploadData)
			.then(response => {
				setProfilePicture(response.secure_url)
			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};
	

	const handleSubmitUser = e => {
		e.preventDefault(); 
		
		signup(role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles, collections)
			.then(response => {
				if (response.message) {
					// reset the form 
                    setUsername('');
                    setPassword('');
					// set the message
					setMessage(response.message);
				} else {
                    // user is correctly signed up in the backend
                    // add the user to the state of App.js
                    props.setUser(response)
                    // redirect to the projects overview
                    props.history.push(`/${response._id}/user-dashboard`)
                }
			})
			.catch(err => console.log(err));
        

	}



	return (
		<div className="signupPage">
			<h3>I am...</h3>

			<div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
				<div className="row">
					<h1 className="text-center">Add a new Studio</h1>
					<div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
						<div className="card shadow">
							<img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h5 className="card-title">Enter the details here</h5>
				<form onSubmit={handleSubmitUser}>
					<div className="mb-3">
						<label className="form-label" htmlFor="username">Username: </label>
						<input
							className="form-control"
							type="text"
							name="username"
							value={username}
							required
							autoFocus
							onChange={e => setUsername(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="password">Create password: </label>
						<input
							className="form-control"
							type="password"
							name="password"
							value={password}
							required
							onChange={e => setPassword(e.target.value)}
						/>
						<div className="valid-feedback">
						Looks good!
						</div>
					</div>
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
						options={tattooStyles} 
						onChange={handleFavouriteStyleChange}
						/>
					</div>
					<div className="mb-3">
						<button className="btn btn-success btn-block col-12" type="submit">Sign Up ✍️</button>
					</div>
					{message && (
					<h3>{message}</h3>
				)}
				</form>
				</div>
				</div>
				</div>
				</div>
			</div>
			




		</div>
	)
}