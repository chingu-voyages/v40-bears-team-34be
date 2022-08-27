import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Admin User',
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email address',
            ],
        },
        role: {
            type: String,
            enum: ['user'],
            default: 'user',
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
