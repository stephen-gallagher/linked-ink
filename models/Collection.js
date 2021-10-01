const { Schema, model } = require("mongoose");

const collectionSchema = new Schema ({
title: String,
description: String,
tattoos:[
    {
        image: String,
        // artist: 
        // {
        //         type: Schema.types.ObjectId,
        //         ref: User,
        // },
        tags: [
            String,
        ],
        caption: String,
        location: String,
    }
    ]
})

const Collection = model("Collection", collectionSchema);

module.exports = Collection;