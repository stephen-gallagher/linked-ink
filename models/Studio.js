const { Schema, model } = require("mongoose");

const studioSchema = new Schema ({
    name: String,
    location: String,
    description: String,
    imageURL: String,
    artists:  {
        type: Schema.types.ObjectId,
        ref: 'User',
        },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Studio = model("Studio", studioSchema);

module.exports = Studio;