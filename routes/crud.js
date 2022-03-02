const express = require('express');
const router = express.Router();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken =
  'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ';
const geocoder = mbxGeocoding({
  accessToken:
    'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ',
});

const User = require('../models/User');
const Tattoo = require('../models/Tattoo');
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const Collection = require('../models/Collection');

const fileUploader = require('../config/cloudinary');
const { response } = require('express');
const { populate } = require('../models/User');

// upload to collection
router.post('/upload', fileUploader.single('imageURL'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

router.post('/tattoos/create', (req, res, next) => {
  const { imageURL, caption, tags } = req.body;
  // if (req.session.user) {
  // }
  if (req.session.user) {
    Tattoo.create({
      imageURL: imageURL,
      tags: tags,
      caption: caption,
      artist: req.session.user._id,
    })
      .then((createdTattoo) => {
        console.log('tattoo', createdTattoo);
        User.findByIdAndUpdate(
          req.session.user._id,
          { $push: { artistCollection: createdTattoo._id } },
          { new: true }
        )
          .populate('artistCollection')
          .then((userFromDB) => {
            res.status(200).json(userFromDB);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
});

// upload to profile picture
router.post(
  '/profile-picture/update',
  fileUploader.single('imageURL'),
  (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.json({ secure_url: req.file.path });
  }
);

router.post('/tattoos/create', (req, res, next) => {
  const { imageURL, caption, tags } = req.body;
  if (req.session.user) {
  }
  if (req.session.user) {
    Tattoo.create({
      imageURL: imageURL,
      tags: tags,
      caption: caption,
      artist: req.session.user._id,
    })
      .then((createdTattoo) => {
        console.log('profile picture', createdTattoo);
        User.findByIdAndUpdate(req.session.user._id, {
          profilePicture: createdTattoo._id,
        })
          .then((userFromDB) => {
            res.status(200).json(userFromDB);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
});

// new collection
router.post('/collections/new', (req, res, next) => {
  const { collectionTitle, collectionDescription } = req.body;
  console.log('title and description', req.body, req.session);

  Collection.create({
    title: collectionTitle,
    description: collectionDescription,
    creator: req.session.user._id,
  })
    .then((createdCollection) => {
      User.findByIdAndUpdate(req.session.user._id, {
        $push: { userCollections: createdCollection._id },
      })
        .then((userFromDB) => {
          res.status(200).json(userFromDB);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// add tattoo to the collection
router.put('/tattoos/:id', (req, res, next) => {
  const { selectedCollection } = req.body;
  const tattooId = req.params.id;
  if (req.session.user) {
    Collection.findOneAndUpdate(
      { creator: `${req.session.user._id}`, title: `${selectedCollection}` },
      { $push: { tattoos: tattooId } },
      { new: true }
    )
      .then((collectionFromDB) => {
        console.log('this is the collection', collectionFromDB);
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// add appointment to the user
router.put('/:id/appointments', (req, res, next) => {
  const { date, time, location, artist, price } = req.body;
  console.log('body', req.body);
  if (req.session.user) {
    User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { myAppointments: { date, time, location, artist, price } } },
      { new: true }
    )
      .then((collectionFromDB) => {
        // console.log('this is the collection', collectionFromDB)
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// add artist to studio and studio to artist
router.put('/studio/:id', (req, res, next) => {
  const studioId = req.params.id;
  if (req.session.user) {
    Studio.findByIdAndUpdate(
      req.params.id,
      { $push: { artists: req.session.user._id } },
      { new: true }
    ).then((studioFromDB) => {
      console.log(studioFromDB);
      res.status(200).json(studioFromDB);
      User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { myStudio: studioId } },
        { new: true }
      )
        .then((userFromDB) => {
          res.status(200).json(userFromDB);
        })
        .catch((err) => {
          next(err);
        })
        .catch((err) => {
          next(err);
        });
    });
  }
});

// get all artists in the studio
router.get('/studios/:id', (req, res, next) => {
  User.find({ myStudio: req.params.id })
    .then((tattooArtists) => {
      res.status(200).json(tattooArtists);
    })
    .catch((err) => next(err));
});

// all tattoos
router.get('/tattoos', (req, res, next) => {
  Tattoo.find()
    .populate('artist')
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
  User.find({ role: 'Artist' })
    .then((artistsFromDB) => {
      res.status(200).json(artistsFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// all studios
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
  const { name, location, description, imageURL } = req.body;
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();
  console.log('this is the body-ody-ody', geoData.body.features[0].geometry);
  // User.findById(req.params.id)
  // .then(studio => {
  Studio.create({
    name: name,
    location: location,
    geometry: geoData.body.features[0].geometry,
    description: description,
    imageURL: imageURL,
  })
    .then((createdStudio) => {
      res.status(200).json(createdStudio);
    })
    .catch((err) => next(err));
});
// })

// studio show page
router.get('/studio/:id', (req, res, next) => {
  Studio.find({ _id: req.params.id })
    .then((studio) => {
      res.status(200).json(studio);
    })
    .catch((err) => next(err));
});

// get artist profile
router.get('/:id/artist-profile/user', (req, res, next) => {
  User.findById(req.params.id)
    .then((artistFromDB) => {
      res.status(200).json(artistFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// get user profile
router.get('/:id/user-dashboard', (req, res, next) => {
  User.findById(req.params.id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// Show Artist tatooo's
router.get('/:id/artist-profile', (req, res, next) => {
  Tattoo.find({ artist: req.params.id })
    .then((tattoos) => {
      console.log(tattoos);
      res.status(200).json(tattoos);
    })
    .catch((err) => next(err));
});

// get specific user collection
router.get('/collections/:id', (req, res, next) => {
  Collection.findById(req.params.id)
    .populate('tattoos')
    .then((collection) => {
      console.log('the collection', collection);
      res.status(200).json(collection);
    })
    .catch((err) => next(err));
});

// get specific user collection on page
router.get('/mycollection/:id', (req, res, next) => {
  const { id } = req.params;
  Collection.findById(req.params.id)
    .populate({
      path: 'tattoos',
      populate: {
        path: 'artist',
      },
    })
    .then((collection) => {
      console.log('the collection', collection);
      res.status(200).json(collection);
    })
    .catch((err) => next(err));
});

// Show User's collections's
router.get('/user/collections', (req, res, next) => {
  Collection.find({ creator: req.session.user._id })
    .populate('tattoos')
    .then((collections) => {
      res.status(200).json(collections);
    })
    .catch((err) => next(err));
});

// get user appointments
router.get('/user/appointments', (req, res, next) => {
  User.findById(req.session.user._id)
    .populate({
      path: 'myAppointments',
      populate: {
        path: 'artist',
      },
    })
    .populate({
      path: 'myAppointments',
      populate: {
        path: 'location',
      },
    })
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((err) => next(err));
});

// create review on artist page
router.post('/:id/artist-profile/reviews', (req, res, next) => {
  const { reviewText, rating } = req.body;
  Review.create({
    reviewText: reviewText,
    rating: rating,
    reviewArtist: req.params.id,
    reviewAuthor: req.session.user._id,
    reviewAuthorUsername: req.session.user.username,
  })
    .then((createdReview) => {
      User.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: createdReview._id } },
        { new: true }
      )
        .populate('reviews')
        .then((updatedUser) => {
          res.status(200).json(updatedUser);
          // code for updated
        });
    })
    .catch((err) => {
      next(err);
    });
});

// create review on studio page
router.post('/studio/:id/reviews', (req, res, next) => {
  const { reviewText, rating } = req.body;
  Review.create({
    reviewText: reviewText,
    rating: rating,
    reviewArtist: req.params.id,
    reviewAuthor: req.session.user._id,
    reviewAuthorUsername: req.session.user.username,
  })
    .then((createdReview) => {
      Studio.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: createdReview._id } },
        { new: true }
      )
        .populate('reviews')
        .then((updatedStudio) => {
          res.status(200).json(updatedStudio);
          // code for updated
        });
    })
    .catch((err) => {
      next(err);
    });
});

// edit user styles and profile picture
router.put('/:id/edit-user', (req, res, next) => {
  const { favouriteStyles, profilePicture } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    favouriteStyles: favouriteStyles,
    profilePicture: profilePicture,
  })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => next(err));
});

// Delete review
router.delete('/artist-profile/reviews/:reviewId', (req, res, next) => {
  const { reviewId, id } = req.params;
  console.log('ids', reviewId, id);
  Review.findByIdAndDelete(reviewId, { new: true })
    .then((deletedReview) => {
      console.log('deletedReview', deletedReview);
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

router.delete('/studio/reviews/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;
  Review.findByIdAndDelete(reviewId, { new: true })
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

// Delete collection
router.delete('/user-dashboard/collections/:id', (req, res, next) => {
  const collectionId = req.params.id;
  console.log('theCollectionID', collectionId);
  Collection.findByIdAndDelete(collectionId)
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

// Delete appointment
router.delete('/user-dashboard/appointments/:date', (req, res, next) => {
  const appointmentDate = req.params.date;
  console.log('theAppointment', appointmentDate);
  if (req.session.user) {
    User.findByIdAndUpdate(
      req.session.user._id,
      { $pull: { myAppointments: { date: `${appointmentDate}` } } },
      { new: true }
    )
      .then((collectionFromDB) => {
        // console.log('this is the collection', collectionFromDB)
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// Show Artist reviews's
router.get('/:id/artist-profile/reviews', (req, res, next) => {
  Review.find({ reviewArtist: req.params.id })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => next(err));
});

// Show studion reviews's
router.get('/studio/:id/reviews', (req, res, next) => {
  Review.find({ reviewArtist: req.params.id })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => next(err));
});

module.exports = router;
