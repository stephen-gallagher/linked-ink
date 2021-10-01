const { Schema, model } = require("mongoose");

const tattooSchema = new Schema({
imageURL: String,
artist:  {
    type: Schema.Types.ObjectId,
     ref: 'User'
        },
tags: [
        String,
        ],
caption: String,
// author: String,
    })

const Tattoo = model("Tattoo", tattooSchema);

module.exports = Tattoo;