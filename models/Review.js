const { Schema, model } = require("mongoose");

const reviewSchema = new Schema ({
    reviewText: String,
    rating: Number,
    reviewArtist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = model("Review", reviewSchema);

module.exports = Review;