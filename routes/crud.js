const express = require("express")
const router = express.Router();


const User = require("../models/User")
const Tattoo = require("../models/User")

const fileUploader = require("../config/cloudinary");
const { response } = require("express");

router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {

  
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
    res.json({ secure_url: req.file.path });
  });




  router.post('/tattoos/create', (req, res, next) => {
	const { imageURL, caption, tags } = req.body;
    console.log('the user', req.session.user)

	// create a new book in the database
	Tattoo.create({
		ImageURL: imageURL,
		tags: tags,
		caption: caption
	})
		.then(createdTattoo => {
            console.log('the tattoo', createdTattoo)
			// User.findByIdAndUpdate(req.session.user._id, {artistCollection: createdTattoo._id})
            // .then(userFromDB => {
            // res.status(200).json(userFromDB)
            // })
		})
		.catch(err => next(err));
});



  module.exports = router;