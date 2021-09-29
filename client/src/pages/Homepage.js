import React from 'react'
import {Link} from 'react-router-dom'

export default function Homepage() {
    return (
        <div>
            <div>
                <h1>Find and book your new tattoo</h1>
            </div>
            <div>
                <h1>I am...</h1>
                <div>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
