import React from 'react'
import service from '../api/service'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



export default function ArtistDashboard(props) {


    const [imageURL, setImageURL] = useState('')
    const [caption, setCaption] = useState('')
    const [tags, setTags] = useState('')


    const handleTagChange = e => {
        const tags = e.target.value 
        let split = tags.split(',')
        setTags(split)
    }

    const handleFileUpload = (e) => {
		// const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

		uploadData.append("imageURL", e.target.files[0])

		service
			.handleUpload(uploadData)
			.then(response => {
				setImageURL(response.secure_url)			})
			.catch(err => console.log("Error when uploading the file: ", err))
	};

    const handleSubmit = e => {
        e.preventDefault();
        service
        .saveNewTattoo(imageURL, caption, tags )
        .then (response => {
            console.log('great response', response)
            setImageURL(response.imageURL)
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
            <h1>Welcome to your dashboard {props.user.firstName}</h1>
            <img src={props.user.profilePicture} alt="profile" style={{ height: '300px' }}/>
            <div className='row'>
            <h1 className="text-center">New image</h1>
            <div className="col-6 offset-3">
            <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="image">Upload your work: </label>
					<input 
                        className="form-control"
						type="file"
						name="imageURL"
						onChange={handleFileUpload}
						/>
                        {imageURL && <img src={imageURL} alt="" style={{ height: '200px' }} />}
                    <label className="form-label" htmlFor="caption">Caption: </label>
					<input
                        className="form-control"
						type="text"
						name="caption"
						value={caption}
						onChange={e => setCaption(e.target.value)}
					/>
                    <label className="form-label" htmlFor="tags">Tags (separate each tag with a comma): </label>
                    <input
                        className="form-control"
						type="text"
						name="tags"
						// value={tags}
						onChange={handleTagChange}
					/>
                     <button className="btn btn-success btn-block col-5" type="submit">Upload ✍️</button>
                        </form>
                        </div>
                        </div>

            <Link to={`/${props.user._id}/artist-profile`}> To your profile </Link>
        </div>
    )
}
