import mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a Review title'],
        maxlength: [100, 'Reviews length cannot exceed 100 characters'],
    },
    text: {
        type: String,
        required: [true, 'Please add some honest reviews'],
    },
    rentRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    petFriendlyRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    gatedRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    InUnitWasherDryerRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    poolRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    fitnessCenterRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    parkingRating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    sentiment: {
        positive: {
            type: Number,
        },
        negative: {
            type: Number,
        },
        neutral: {
            type: Number,
        },
        compound: {
            type: Number,
        },
        result: {
            type:String
        }
    },
    amenitiesScore: {
        type: Number,
    },
    reviewsScore: {
        type: Number,
    },
    apartment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Apartment',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        default: `62f4e5b99fbafe1ce87ead33`,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export const Review = mongoose.model('Review',ReviewSchema)