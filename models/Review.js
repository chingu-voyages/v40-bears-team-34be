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

export const Review = mongoose.model('Review', ReviewSchema);
