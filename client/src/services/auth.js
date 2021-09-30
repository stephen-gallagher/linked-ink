
import axios from 'axios';

const signup = (role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles) => {
	return axios.post('/api/auth/signup', { role, username, password, profilePicture, firstName, lastName, aboutMe, tattooStyle, favouriteStyles })
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

const login = (username, password) => {
	return axios.post('/api/auth/login', { username, password })
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

const logout = () => {
	return axios.delete('/api/auth/logout')
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
}

export { signup, login, logout };