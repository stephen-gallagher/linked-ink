const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
},
  password: String,
  FirstName: String,
  LastName: String,
  profilePicture: String,
  tattooStyle: String,
  favouriteStyles: String,
  aboutMe: String,
  tattoos:  
    {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
  },

  favouriteArtists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Collection',
      }
    ],
    myAppointments: [
      {
        date: Date,
        Cost: Number,
        location: String,
      }
    ],
    role: String,
});

const User = model("User", userSchema);

module.exports = User;
