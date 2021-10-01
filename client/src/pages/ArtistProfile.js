import React from 'react'

export default function ArtistProfile(props) {
    return (
        <div>
            <h1>{props.user.firstName}'s profile</h1>
            <img src={props.user.profilePicture}/>
            <p>{props.user.aboutMe}</p>
        </div>
    )
}
