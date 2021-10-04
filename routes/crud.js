const express = require("express")
const router = express.Router();

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken})


const User = require("../models/User")
const Tattoo = require("../models/Tattoo")
const Review = require("../models/Review")
const Studio = require("../models/Studio")
const Collection = require("../models/Collection")

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


// new collection
router.post('/collections/new', (req, res, next) => {
  const {title, description} = req.body

  Collection.create({
    title: title,
    description: description,
    creator: req.session.user._id
  })
  .then(createdCollection => {
      User.findByIdAndUpdate(req.session.user._id, { $push: {userCollections: createdCollection._id} })
      .then(userFromDB => {
      res.status(200).json(userFromDB)
      })
      .catch(err => next(err))  
  })
  .catch(err => next(err)) 
}) 


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

  // get specific tattoo
  router.get('/tattoos/:id', (req, res, next) => {
    Tattoo.findById(req.params.id)
      .then((tattooFromDB) => {
        res.status(200).json(tattooFromDB);
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


// get current user
router.get('/users', (req, res, next) => {
  User.findById(req.session.user._id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

  // create new Studio
router.post('/new-studio', async (req, res, next) => {
  console.log('hello')
  const geoData = await geocoder.forwardGeocode({
    query: req.body.location,
    limit: 1
  }).send()
  const {name, location, description, imageURL} = req.body
  User.findById(req.params.id)
  .then(studio => {
    Studio.create({
      name: name, 
      location: location,
      geometry: geoData.body.features[0].geometry,
      description: description,
      imageURL: imageURL
    })
    .then(createdStudio => {
      res.status(200).json(createdStudio)
    })
    .catch(err => next(err))
})
})


// studio show page
router.get('/studio/:id', (req,res,next) => {
  Studio.find({_id: req.params.id})
  .then(studio => {
      res.status(200).json(studio)
   
  })
  .catch(err => next(err))
})

// get user profile
router.get('/:id/artist-profile/user', (req, res, next) => {
  User.findById(req.params.id)
    .then((artistFromDB) => {
      res.status(200).json(artistFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// Show Artist tatooo's
router.get('/:id/artist-profile', (req,res,next) => {
    Tattoo.find({artist: req.params.id})
    .then(tattoos => {
        res.status(200).json(tattoos)
     
    })
    .catch(err => next(err))
})

// Show User's collections's
router.get('/user/collections', (req,res,next) => {
  Collection.find({creator: req.session.user._id})
  .then(collections => {
      res.status(200).json(collections)
   
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
      reviewAuthor: req.session.user._id,
      reviewAuthorUsername: req.session.user.username
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
  Review.find({reviewArtist: req.params.id})
  .then(reviews => {
      res.status(200).json(reviews)
   
  })
  .catch(err => next(err))
})


  module.exports = router;

