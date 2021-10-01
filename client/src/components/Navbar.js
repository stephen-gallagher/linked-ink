import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../services/auth'

export default function Navbar(props) {

    const handleLogout = () => {
		logout().then(() => {
			props.setUser(null);
		})
	}


    return (
        <nav>
            <>
            <ul>
                <li>
                    <Link to="/">
                    Home
                    </Link>
                </li>
                <li>
                    <Link to="/signup">
                    Sign up
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                    Login
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={() => handleLogout()}>
						Logout
					</Link>
                </li>
                <li>
                    <Link to="/artists">
                    Find an artist
                    </Link>
                </li>
            </ul>
            </>
        </nav>
    )
}
