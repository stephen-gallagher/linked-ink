const express = require("express")
const router = express.Router();


const User = require("../models/User")
const Tattoo = require("../models/Tattoo")
const Review = require("../models/Review")
const Studio = require("../models/Studio")

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
    if(req.session.user) {
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


// all tattoos
router.get('/', (req, res, next) => {
    Tattoo.find()
      .then((tattoosFromDB) => {
        res.status(200).json(tattoosFromDB);
      })
      .catch((err) => {
        next(err);
      });
  });


//   all artists
router.get('/all-artists', (req, res, next) => {
    User.find({role: 'Artist'})
      .then((artistsFromDB) => {
        res.status(200).json(artistsFromDB);
      })
      .catch((err) => {
        next(err);
      });
  });

  //   all studios
router.get('/all-studios', (req, res, next) => {
  Studio.find()
    .then((studiosFromDB) => {
      res.status(200).json(studiosFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

  // create new Studio
router.post('/new-studio', (req, res, next) => {
  const {name, location, description, imageURL} = req.body
  User.findById(req.params.id)
  .then(artist => {
    Studio.create({
      name: name, 
      location: location,
      description: description,
      imageURL: imageURL
    })
    .then(createdStudio => {
      res.status(200).json(createdStudio)
    })
    .catch(err => next(err))
})
})


// Show Artist tatooo's
router.get('/:id/artist-profile', (req,res,next) => {
    Tattoo.find({artist: req.params.id})
    .then(tattoos => {
        res.status(200).json(tattoos)
     
    })
    .catch(err => next(err))
})


// create review on artist page
router.post('/:id/artist-profile/reviews', (req, res, next) => {
  const {reviewText, rating} = req.body
  User.findById(req.params.id)
  .then(artist => {
    Review.create({
      reviewText: reviewText, 
      rating: rating,
      reviewArtist: req.params.id,
      reviewAuthor: req.session.user._id
    })
    .then(createdReview => {
      artist.reviews.push(createdReview)
      artist.save()
    })
  .catch(err => {
    next(err);
  })
  .catch(err => {
      console.log(err);
  })
  }) 
})

// Delete review
router.delete('/:id/artist-profile/reviews/:reviewId', (req, res, next) => {
  console.log("delete me!")
})

// Show Artist reviews's
router.get('/:id/artist-profile/reviews', (req,res,next) => {
  Review.find({artist: req.params.id})
  .then(reviews => {
      res.status(200).json(reviews)
   
  })
  .catch(err => next(err))
})


  module.exports = router;

