import React from 'react'
import service from '../api/service'
import { useState } from 'react'
import axios from 'axios'



export default function ArtistDashboard(props) {
console.log('the props', props)

    const [imageURL, setImageURL] = useState('')
    const [caption, setCaption] = useState('')
    const [tags, setTags] = useState('')

    // const [publicImages, setPublicImages] = []


    const handleTagChange = e => {
        const tags = e.target.value 
        let split = tags.split(',')
        setTags(split)
    }

    const handleFileUpload = (e) => {
		// const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

		uploadData.append("profilePicture", e.target.files[0])

		service
			.handleUpload(uploadData)
			.then(response => {
				setImageURL(response.secure_url)
                console.log(imageURL)
			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};

    const handleSubmit = e => {
        e.preventDefault();
        service
        .saveNewTattoo(imageURL, caption, tags)
        .then (response => {
            console.log(response.data)
            // setImageURL(response.imageURL)
        })
        .catch(err => console.log(err))
        axios.post('/api/crud/tattoos/create', {imageURL, caption, tags})
        .then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		});
    }
        

    return (
        <div>
            <h1>Welcome to she show {props.user.firstName}</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="image">Upload your work: </label>
					<input 
						type="file"
						name="profilePicture"
						onChange={handleFileUpload}
						/>
                    <label htmlFor="caption">Caption: </label>
					<input
						type="text"
						name="caption"
						value={caption}
						onChange={e => setCaption(e.target.value)}
					/>
                    <label htmlFor="tags">Tags (separate each tag with a comma): </label>
                    <input
						type="text"
						name="tags"
						// value={tags}
						onChange={handleTagChange}
					/>
                     <button type="submit">Add Photo</button>
                        </form>
        </div>
    )
}
