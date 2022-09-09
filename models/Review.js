import mongoose from 'mongoose';
import { scoreKeywords } from '../utils/reviews.mjs';
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
    scores: {
        quiet: { positive: Number, negative: Number },
        clean: { positive: Number, negative: Number },
        management: { positive: Number, negative: Number },
        neighborhood: { positive: Number, negative: Number },
        crime: { positive: Number, negative: Number },
        bugs: { positive: Number, negative: Number },
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

ReviewSchema.statics.getTotalScores = async function (apartmentId) {
    const calculatedScores = await this.aggregate([
        {
            $match: { apartment: apartmentId },
        },
        {
            $group: {
                _id: '$apartment',
                quietPositive: { $sum: '$scores.quiet.positive' },
                quietNegative: { $sum: '$scores.quiet.negative' },
                cleanPositive: { $sum: '$scores.clean.negative' },
                cleanNegative: { $sum: '$scores.clean.negative' },
                managementPositive: { $sum: '$scores.management.positive' },
                managementNegative: { $sum: '$scores.management.negative' },
                neighborhoodPositive: { $sum: '$scores.neighborhood.positive' },
                neighborhoodNegative: { $sum: '$scores.management.negative' },
                crimePositive: { $sum: '$scores.crime.positive' },
                crimeNegative: { $sum: '$scores.crime.negative' },
                bugsPositive: { $sum: '$scores.bugs.positive' },
                bugsNegative: { $sum: '$scores.neighborhood.negative' },
            },
        },
    ]);

    try {
        await this.model('Apartment').findByIdAndUpdate(apartmentId, {
            reviewScores: calculatedScores[0],
        });
    } catch (error) {}
};

ReviewSchema.pre('save', async function (next) {
    const scores = scoreKeywords(this.text);
    this.scores = scores;
});

ReviewSchema.post('save', function () {
    this.constructor.getTotalScores(this.apartment);
});

ReviewSchema.post('remove', function () {
    this.constructor.getTotalScores(this.apartment);
});

export const Review = mongoose.model('Review', ReviewSchema);
