const { Schema, model } = require("mongoose");

const artistSchema = new Schema ({
username: {
    type: String,
    unique: True
},
password: String,
FirstName: String,
LastName: String,
tattooStyle: String,
aboutMe: String,
tattoos:  {
    type: Schema.types.ObjectId,
    ref: Artist,
},
})

const Artist = model("Artist", artistSchema);

module.exports = Artist;