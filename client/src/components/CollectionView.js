import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'

export default function CollectionView(props) {

    const [collection, setCollection] = useState(null)
    const [currentUser, setCurrentUser] = useState({})


    const getCurrentUser =  () => {
		// get request to the server
		 axios.get(`/api/crud/users`)
			.then(response => {
				setCurrentUser(response.data);
                console.log('user', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getCurrentUser();
	}, [])



    const getCollection = () => {
		 axios.get(`/api/crud/collections/${props.match.params.id}`)
			.then(response => {
				setCollection(response.data);
                console.log('collection info', response.data)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
			getCollection();
	}, [])





	if(collection === null){
		return<></>
	}
	
    return (

        <>
			
            <p>{collection.title}</p>
             {collection.tattoos.map((tattoo) => {
                     return (
                    <img src={tattoo.imageURL}></img>
                     )
                 })}
            
            
        </>
    )
}

