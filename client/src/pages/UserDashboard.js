import React from 'react'
import service from '../api/service'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserDashboard(props) {
    console.log(props)
    return (
        <div>
        {props.user.userCollections.map((collection) => {
            return (
                                   
            <div>
                 <p>{collection.title}</p>
            </div>
                                
                 )
            })}
            <h1>Welcome  {props.user.username}</h1>
            <img src={props.user.profilePicture} alt="profile" style={{ height: '300px' }}/>

            <div>
                <h2>Your collections:</h2>
                
            </div>
        </div>

    )
}
