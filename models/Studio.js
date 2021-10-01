const { Schema, model } = require("mongoose");

const studioSchema = new Schema ({
name: String,
location: String,
description: String,
artists:  {
    type: Schema.types.ObjectId,
    ref: 'User',
    },
})

const Studio = model("Studio", studioSchema);

module.exports = Studio;