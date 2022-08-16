import mongoose from 'mongoose';

export const ScoresSchema = new mongoose.Schema(
    {
        amenitiesScore: {
            type: Number,
            required: true,
            default: 30,
        },
        rentalScore: {
            type: Number,
            required: true,
            default: 30,
        },
        reviewsScore: {
            type: Number,
            required: true,
            default: 30,
        },
    },
    { timestamps: true }
);

export const Scores = mongoose.model('Scores', ScoresSchema);
