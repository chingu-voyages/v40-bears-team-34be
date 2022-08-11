import mongoose from 'mongoose';
import slugify from 'slugify';
import {AmenitySchema} from './Amenity.js'

const ApartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Apartment name is required'],
        },
        city: {
            type: String,
            required: [
                true,
                'Enter the city in the format city, state i.e LosAngelos, CA',
            ],
        },
        state: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        monthlyRent: {
            type: Number,
            default: 3000,
        },
        bedrooms: {
            type: Number,
            min: [1, 'Minimum number of bedrooms is 1'],
            max: [3, 'maximum number or bedrooms is 3'],
            default: 1,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        contactPerson: {
            type: String,
            default: 'admin',
        },
        contactEmail: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email address',
            ],
            default: 'admin@apch.com',
        },
        livabilityScore: {
            type: Number,
            min: [0, 'Minimum score is 0 and decimals are allowed'],
            max: [10, 'maximum score is 10'],
            default: 0,
        },
        address: {
            type: String,
        },
        slug: {
            type: String,
        },
        reviews: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Review',
            required: true,
        }],
        amenities: {
            type: AmenitySchema,
            default: {},
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

ApartmentSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export const Apartment = mongoose.model('Apartment', ApartmentSchema);
