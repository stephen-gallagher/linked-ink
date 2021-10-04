const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  profilePicture: String,
  tattooStyle: [
    String
  ],
  favouriteStyles: [
    String,
  ],
  aboutMe: String,
  favouriteArtists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  artistCollection: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tattoo',
      }
    ],
    userCollections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tattoo',
      }
    ],
    myAppointments: [
      {
        date: Date,
        Cost: Number,
        location: String,
      }
    ],
    reviews: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Review'
      }
  ],
  myStudio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio'
    }
});

const User = model("User", userSchema);

module.exports = User;
