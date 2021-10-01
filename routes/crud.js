const express = require("express")
const router = express.Router();


const User = require("../models/User")
const Tattoo = require("../models/Tattoo")

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
    // const userID = req.session.user._id
	const { imageURL, caption, tags } = req.body;
    if(req.session.user) {
    console.log('userID', req.session.user._id)
}
if(req.session.user){
	Tattoo.create({
        
		imageURL: imageURL,
		tags: tags,
		caption: caption,
        artist: req.session.user._id
	})
		.then(createdTattoo => {
            User.findByIdAndUpdate(req.session.user._id, { $push: {artistCollection: createdTattoo._id} })
            .then(userFromDB => {
            res.status(200).json(userFromDB)
            })
            .catch(err => next(err))
		})
		.catch(err => next(err));
    }
});



router.get('/', (req, res, next) => {
    Tattoo.find()
      .then((tattoosFromDB) => {
        // const loggedInUser = req.user;
        res.status(200).json(tattoosFromDB);
      })
      .catch((err) => {
        next(err);
      });
  });


router.get('/:id/artist-profile', (req,res,next) => {
    User.findById(req.params.id)
    .then(userFromDB => {
        console.log('userFromDB', userFromDB)
        Tattoo.findById(userFromDB.artistCollection)
        .then(tattoosFromCollection => {
            console.log('theTattoos', tattoosFromCollection)
        })
    })
    .catch(err => next(err))
})


  module.exports = router;


//   Tattoo.find