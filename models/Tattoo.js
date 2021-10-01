const { Schema, model } = require("mongoose");

const tattooSchema = new Schema({
imageURL: String,
// artist: 
//         {
//             type: Schema.types.ObjectId,
//             ref: User,
//         },
tags: [
        String,
        ],
caption: String,
// location: String,
    })

const Tattoo = model("Tattoo", tattooSchema);

module.exports = Tattoo;