import { useState } from 'react'
import { signup } from '../services/auth';
import Switch from 'react-switch'
import Toggle from '../components/Toggle';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios';
import service from '../api/service'


export default function Signup(props) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [profilePicture, setProfilePicture] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [tattooStyle, setTattooStyle] = useState('')
	const [favouriteStyles, setFavouriteStyles] = useState('')
	const [aboutMe, setAboutMe] = useState('')
	const [role, setRole] = useState('Artist')
	const [collections, setCollections] = useState('')

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [tattoos, setTattoos] = useState('')


	const [message, setMessage] = useState('');
    const [toggled, setToggled] = useState(false)

    const handleToggleChange = e => {
	setToggled(e.target.checked)
	setRole('User')
	}

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

	const handleSubmitArtist = e => {
		e.preventDefault();
		
		signup(role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles)
			.then(response => {
				console.log('the response', response)
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
                    props.history.push(`/${response._id}/artist-dashboard`)
                }
			})
			.catch(err => console.log(err));
        
	}

	const animatedComponents = makeAnimated();

	const tattooStyles = [
		{ value: 'traditional', label: 'Traditional/Old School' },
		{ value: 'neoTraditional', label: 'Neo Traditional' },
		{ value: 'tribal', label: 'Tribal' },
		{ value: 'waterColor', label: 'Water Color' },
		{ value: 'blackwork', label: 'Blackwork' },
		{ value: 'realism', label: 'Realism' },
		{ value: 'japanese', label: 'Japanese' },
		{ value: 'geometric', label: 'Geometric' },
		{ value: 'microTattoo', label: 'Micro Tattoo' },
		{ value: 'abstract', label: 'Abstract' },
		{ value: '3d', label: '3D' },
		{ value: 'cartoon', label: 'Cartoon' },
		{ value: 'portrait', label: 'Portrait' },
		{ value: 'continuousLine', label: 'Continuous Line' },
		{ value: 'animal', label: 'Animal' },
		{ value: 'sketch', label: 'Sketch' },
		{ value: 'other', label: 'Other' },

	  ]

	return (
		<div className="signupPage">
			<h3>I am...</h3>
			<div className="d-flex justify-content-center">
				<h4>A tattoo artist</h4>
				<Toggle onChange={handleToggleChange} />
				<h4>Looking for a tattoo</h4>
			</div>
			{toggled ? 
			<div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
				<div className="row">
					<h1 className="text-center">Create a user account</h1>
					<div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
						<div className="card shadow">
							<img src="/tattoo-images/tattoo-group-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h5 className="card-title">Enter your details here</h5>
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
			:
			<div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
				<div className="row">
					<h1 className="text-center">Create an artist account</h1>
					<div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
					<div className="card shadow">
							<img src="/tattoo-images/tattoo-artist-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h5 className="card-title">Enter your details here</h5>
				<form onSubmit={handleSubmitArtist}>
					<div className="mb-3">
						<label className="form-label" htmlFor="username">Username: </label>
						<input
							className="form-control"
							type="text"
							name="username"
							value={username}
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
							onChange={e => setPassword(e.target.value)}
						/>
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
						<label className="form-label" htmlFor="firstName">First Name: </label>
						<input
							className="form-control"
							type="text"
							name="firstName"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="lastName">Last Name: </label>
						<input
							className="form-control"
							type="text"
							name="lastName"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="tattooStyle">Tattoo style: </label>
						<Select 
						name="tattooStyle"
						components={animatedComponents}
						isMulti
						options={tattooStyles} 
						onChange={handleTattooStyleChange}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="aboutMe">About Me: </label>
						<input
						className="form-control form-control-lg"
						type="text"
						name="aboutMe"
						value={aboutMe}
						// style={{height:"150px"}}
						onChange={e => setAboutMe(e.target.value)}
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
			}




		</div>
	)
}