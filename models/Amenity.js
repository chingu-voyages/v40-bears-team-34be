import mongoose from 'mongoose';

export const AmenitySchema = new mongoose.Schema(
    {
        petFriendly: {
            type: Boolean,
            required: true,
            default: false,
        },
        gated: {
            type: Boolean,
            required: true,
            default: false,
        },
        InUnitWasherDryer: {
            type: Boolean,
            required: true,
            default: false,
        },
        pool: {
            type: Boolean,
            required: true,
            default: false,
        },
        fitnessCenter: {
            type: Boolean,
            required: true,
            default: false,
        },
        parking: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

export const Amenity = mongoose.model('Amenity', AmenitySchema);
