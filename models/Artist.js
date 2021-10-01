// const { Schema, model } = require("mongoose");

// const artistSchema = new Schema ({
// username: {
//     type: String,
//     unique: True
// },
// password: String,
// FirstName: String,
// LastName: String,
// imageURL: String,
// tattooStyle: String,
// aboutMe: String,
// tattoos:  {
//     type: Schema.types.ObjectId,
//     ref: Collection,
// },
// favouriteArtists: [
//     {
//       type: Schema.types.ObjectId,
//       ref: Artist
//     }
//   ],
// myTattoos: [
//     {
//       imageURL: String,
//       title: String,
//       description: String,
//     }
//   ],
// collections: [
//     {
//       type: Schema.types.ObjectId,
//       ref: Collection 
//     }
//   ],
//   myAppointments: [
//     {
//       date: Date,
//       time: Time,
//       Cost: Number,
//       location: String,
//     }
//   ],
//   role: String,
// })

// const Artist = model("Artist", artistSchema);

// module.exports = Artist;