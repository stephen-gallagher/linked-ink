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


	const [message, setMessage] = useState('');
    const [toggled, setToggled] = useState(false)

    const handleToggleChange = e => {
	setToggled(e.target.checked)
	setRole('User')
	}

	const handleTattooStyleChange = (e) => {
		const newValuesArr = e ? e.map(item => item.value) : [];
		console.log('the value', e[0].value)
		console.log(newValuesArr)
		// setTattooStyle({value: e.target.value})
		setTattooStyle(newValuesArr)
		// console.log()
	}

	const handleFavouriteStyleChange = e => {
		const newValuesArr = e ? e.map(item => item.value) : [];
		console.log('the value', e[0].value)
		console.log(newValuesArr)
		setFavouriteStyles(newValuesArr)
	}

	const handleFileUpload = (e) => {
		// const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

		uploadData.append("profilePicture", e.target.files[0])

		service
			.handleUpload(uploadData)
			.then(response => {
				console.log('hello', response)
				setProfilePicture(response.secure_url)
			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};
	

	const handleSubmitUser = e => {
		e.preventDefault();
		
		signup(role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles)
			.then(response => {
				console.log('the response', response);
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
                    props.history.push('/us')
                }
			})
			.catch(err => console.log(err));
        
	}

	const handleSubmitArtist = e => {
		e.preventDefault();
		
		signup(role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles)
			.then(response => {
				console.log('the response', response);
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
                    props.history.push('/us')
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
			<h3>Create a user account</h3>
			<div>
				<Toggle onChange={handleToggleChange} />
			</div>
			{toggled ? 
			<div className="signupForm">
				<h2>User sign up</h2>
				<form onSubmit={handleSubmitUser}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<label htmlFor="password">Create password: </label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<label htmlFor="profilePicture">Profile picture: </label>
					<input 
						type="file"
						name="profilePicture"
						onChange={handleFileUpload}
						/>
						{profilePicture && <img src={profilePicture} alt="" style={{ height: '200px' }} />}
					<label htmlFor="favouriteStyles">Favourite tattoo styles: </label>
					<Select 
					name="favouriteStyles"
					components={animatedComponents}
					isMulti
					options={tattooStyles} 
					// value={tattooStyles}
					onChange={handleFavouriteStyleChange}
					/>
					<button type="submit">Sign Up ✍️</button>
					{message && (
					<h3>{message}</h3>
				)}
				</form>
			</div>
			:
			<div className="signupForm">
				<h2>Artist sign up</h2>
				<form onSubmit={handleSubmitArtist}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<label htmlFor="password">Create password: </label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<label htmlFor="profilePicture">Profile picture: </label>
					<input 
						type="file"
						name="profilePicture"
						onChange={handleFileUpload}
						/>
						 {profilePicture && <img src={profilePicture} alt="" style={{ height: '200px' }} />}
					<label htmlFor="firstName">First Name: </label>
					<input
						type="text"
						name="firstName"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
					<label htmlFor="lastName">Last Name: </label>
					<input
						type="text"
						name="lastName"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
					<label htmlFor="tattooStyle">Tattoo style: </label>
					<Select 
					name="tattooStyle"
					components={animatedComponents}
					isMulti
					options={tattooStyles} 
					onChange={handleTattooStyleChange}
					/>
					<label htmlFor="aboutMe">About Me: </label>
					<input
					type="text"
					name="aboutMe"
					value={aboutMe}
					onChange={e => setAboutMe(e.target.value)}
					/>
					<button type="submit">Sign Up ✍️</button>
						{message && (
						<h3>{message}</h3>
				)}
				</form>
			</div>
			}




		</div>
	)
}