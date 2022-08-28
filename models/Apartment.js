import mongoose from 'mongoose';
import slugify from 'slugify';
import { AmenitySchema } from './Amenity.js';
import { ScoresSchema } from './Scores.js';

const ApartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Apartment complex name is required'],
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
        // bedroom: {
        //     rooms: {
        //         type: Number,
        //         enum: [1, 2, 3, 4, 5],
        //         required: [true, 'Add the bedroom count for this apartment'],
        //     },
        //     monthlyRent: {
        //         type: Number,
        //         required: [true, 'Please enter the amount in dollars'],
        //     },
        // },
        bedrooms: {
            '1Bedroom': {
                exist: {
                    type: Boolean,
                    default: true,
                },
                monthlyRent: {
                    type: Number,
                    default: 1500,
                },
            },
            '2Bedroom': {
                exist: {
                    type: Boolean,
                    default: true,
                },
                monthlyRent: {
                    type: Number,
                    default: 2000,
                },
            },
            '3Bedroom': {
                exist: {
                    type: Boolean,
                    default: true,
                },
                monthlyRent: {
                    type: Number,
                    default: 3000,
                },
            },
            '4Bedroom': {
                exist: {
                    type: Boolean,
                },
                monthlyRent: {
                    type: Number,
                },
            },
            '5Bedroom': {
                exist: {
                    type: Boolean,
                },
                monthlyRent: {
                    type: Number,
                },
            },
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
        contact: {
            name: {
                type: String,
                default: 'admin',
            },
            email: {
                type: String,
                match: [
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    'Please add a valid email address',
                ],
                default: 'admin@apch.com',
            },
        },

        scores: {
            type: ScoresSchema,
            default: {
                amenitiesScore: 10,
                rentalScore: 30,
                reviewsScore: 30,
            },
        },
        address: {
            type: String,
        },
        slug: {
            type: String,
        },
        reviews: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Review',
                required: true,
            },
        ],
        amenities: {
            type: AmenitySchema,
            default: {},
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

ApartmentSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Delete all the reviews of an apartment when the apartment is deleted.
ApartmentSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ apartment: this._id });
});

export const Apartment = mongoose.model('Apartment', ApartmentSchema);
