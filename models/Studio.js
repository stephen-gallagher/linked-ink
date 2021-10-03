const { Schema, model } = require("mongoose");

const studioSchema = new Schema ({
    name: String,
    location: String,
    geometry: {
        type: {
        type: String,
        enum:['Point'],
        required: true
    },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    imageURL: String,
    artists:  [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Studio = model("Studio", studioSchema);

module.exports = Studio;