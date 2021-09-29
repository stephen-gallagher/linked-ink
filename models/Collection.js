const { Schema, model } = require("mongoose");

const collectionSchema = new Schema ({
title: String,
description: String,
tattoos:[
    {
        imageURL: String,
        artist: 
        {
                type: Schema.types.ObjectId,
                ref: Artist,
        },
        caption: String,
        location: String,
    }
    ]
})

const Collection = model("Collection", collectionSchema);

module.exports = Collection;