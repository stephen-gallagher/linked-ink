const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: String,
  tattooStyle: [String],
  favouriteStyles: [String],
  aboutMe: String,
  favouriteArtists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  artistCollection: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tattoo',
    },
  ],
  userCollections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tattoo',
    },
  ],
  myAppointments: [
    {
      date: String,
      time: String,
      price: String,
      location: {
        type: Schema.Types.ObjectId,
        ref: 'Studio',
      },
      artist: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  myStudio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
  },
  city: String,
});

const User = model('User', userSchema);

module.exports = User;
