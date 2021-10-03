import React from 'react'

export default function UserDashboard(props) {
    console.log(props)
    return (
        <div>
            <h1>Welcome  {props.user.username}</h1>
        </div>
    )
}
