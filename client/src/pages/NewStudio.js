import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios';
import service from '../api/service'
import styled from 'styled-components'


export default function Signup(props) {

	const [name, setName] = useState('');
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')


	const handleFileUpload = (e) => {
		// const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

		uploadData.append("imageURL", e.target.files[0])

		service
			.handleUpload(uploadData)
			.then(response => {
				setImageURL(response.secure_url)
			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};
	

	const handleSubmitUser = e => {
		e.preventDefault(); 
		axios.post(`/api/crud/new-studio`, {name, location, description, imageURL})
         .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
        
	}



	return (
		<div className="signupPage">

			<div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
				<div className="row">
					<h1 className="text-center">Add a new Studio</h1>
					<div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
						<div className="card shadow">
							<img src="/tattoo-images/tattoo-sign-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h5 className="card-title">Enter the details here</h5>
				<form onSubmit={handleSubmitUser}>
					<div className="mb-3">
						<label className="form-label" htmlFor="name">Name: </label>
						<input
							className="form-control"
							type="text"
							name="name"
							value={name}
							required
							autoFocus
							onChange={e => setName(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="location">Location: </label>
						<input
							className="form-control"
							type="text"
							name="location"
							value={location}
							required
							onChange={e => setLocation(e.target.value)}
						/>
					</div>
                    <div className="mb-3">
						<label className="form-label" htmlFor="description">About the studio: </label>
						<input
							className="form-control"
							type="text"
							name="description"
							value={description}
							required
							onChange={e => setDescription(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="imageURL">Profile picture: </label>
						<input 
							className="form-control"
							type="file"
							name="imageURL"
							onChange={handleFileUpload}
							/>
							{imageURL && <img src={imageURL} alt="" style={{ height: '200px' }} />}
					</div>
					<div className="mb-3">
						<button className="btn btn-success btn-block col-12" type="submit">Sign Up ✍️</button>
					</div>
				
				</form>
				</div>
				</div>
				</div>
				</div>
			</div>
			




		</div>
	)
}