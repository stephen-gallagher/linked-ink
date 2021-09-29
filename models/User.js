const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: True
},
  Password : String,
  ImageURL : String,
  favouriteArtists: [
      {
        type: Schema.types.ObjectId,
        ref: Artist
      }
    ],
  myTattoos: [
      {
        imageURL: String,
        title: String,
        description: String,
      }
    ],
  collections: [
      {
        type: Schema.types.ObjectId,
        ref: Collection 
      }
    ],
    myAppointments: [
      {
        date: Date,
        time: Time,
        Cost: Number,
        location: String,
      }
    ]
});

const User = model("User", userSchema);

module.exports = User;
