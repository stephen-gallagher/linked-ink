import { useState } from 'react'
import { signup } from '../services/auth';
import Switch from 'react-switch'
import Toggle from '../components/Toggle';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


export default function Signup(props) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [profilePicture, setProfilePicture] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [tattooStyle, setTattooStyle] = useState('')
	const [favouriteStyles, setFavouriteStyles] = useState('')
	const [aboutMe, setAboutMe] = useState('')
	const [role, setRole] = useState('')


	const [message, setMessage] = useState('');
    const [toggled, setToggled] = useState(false)

    const handleToggleChange = e => {
	setToggled(e.target.checked)
	}

	// const handleTattooStyleChange = e => {
	// 	// const values = Array.from(e.target.values, option => option.value);
	// 	setTattooStyle({tattooStyle})
	// 	console.log(e.target)
	// }

	const handleFavouriteStyleChange = e => {
		// const values = Array.from(e.target.values, option => option.value);
		console.log(e.target)
	}

	const handleSubmit = e => {
		e.preventDefault();
		signup(username, password, profilePicture)
			.then(response => {
				console.log(response);
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
                    props.history.push('/projects')
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
				<form onSubmit={handleSubmit}>
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
						value={profilePicture}
						onChange={e => setProfilePicture(e.target.value)}
						/>
					{/* <label htmlFor="favouriteStyles">Favourite tattoo styles: </label>
					<Select 
					components={animatedComponents}
					isMulti
					options={tattooStyles} 
					value={tattooStyles}
					onChange={handleFavouriteStyleChange}
					/> */}
					<button type="submit">Sign Up ✍️</button>
					{message && (
					<h3>{message}</h3>
				)}
				</form>
			</div>
			:
			<div className="signupForm">
				<h2>Artist sign up</h2>
				<form onSubmit={handleSubmit}>
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
						value={profilePicture}
						onChange={e => setProfilePicture(e.target.value)}
						/>
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
					{/* <label htmlFor="tattooStyle">Tattoo style: </label>
					<Select 
					components={animatedComponents}
					isMulti
					options={tattooStyles} 
					value={tattooStyle}
					onChange={e => }
					/> */}
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



			{/* <form onSubmit={handleSubmit}>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">Sign Up ✍️</button>
				{message && (
					<h3>{message}</h3>
				)}
			</form> */}
		</div>
	)
}