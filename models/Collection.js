const { Schema, model } = require("mongoose");

const collectionSchema = new Schema ({
title: String,
description: String,
tattoos:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Tattoo',
    }
    ],
creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
}
})

const Collection = model("Collection", collectionSchema);

module.exports = Collection;