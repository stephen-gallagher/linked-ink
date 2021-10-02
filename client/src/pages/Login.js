import { useState } from 'react'
import { login } from '../services/auth';

export default function Login(props) {


	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);


	const handleSubmit = e => {
       
  

		e.preventDefault();
		console.log(username, password)

		login(username, password)
			.then(response => {
				console.log('hey', response);
				if (response.message) {
					// reset the form 
					setUsername('');
					setPassword('');
					// set the message
					setMessage(response.message);
				} else {
					// user is correctly signed up in the backend
					// add the user to the state of App.js
					props.setUser(response);
					// redirect to the projects overview
                    if(response.role === 'User'){
					props.history.push('/:id/user-dashboard');
                    } else if(response.role === 'Artist'){
                        props.history.push(`/${response._id}/artist-dashboard`)
				}
            }
			})
			.catch(err => console.log(err));
	}

	return (
		<>
			<h3 className="mt-4">Login</h3>
            <div className="row">
					<div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4 mt-4 mb-5">
					<div className="card shadow">
							<img src="/tattoo-images/tattoo-girl-1.jpeg" alt="tattoo-girl"className="card-img-top"></img>
							<div className="card-body">
								<h5 className="card-title">Enter your details here</h5>
			<form novalidate validated={validated} onSubmit={handleSubmit}>
            <div className="mb-3">
				<label className="form-label" htmlFor="username">Username: </label>
				<input
                    className="form-control"
					type="text"
					name="username"
					value={username}
                    required
					onChange={e => setUsername(e.target.value)}
				/>
        
                </div>
                <div className="mb-3">
				<label className="form-label" htmlFor="password">Password (must be 4 characters min): </label>
				<input
                    className="form-control"
					type="password"
					name="password"
					value={password}
                    required
					onChange={e => setPassword(e.target.value)}
				/>
                </div>
				<button className="btn btn-success col-12" type="submit">Log in 🔑</button>
				{message && (
					<h3>{message}</h3>
				)}
			</form>
            </div>
            </div>
            </div>
            </div>
		</>
	)
}
