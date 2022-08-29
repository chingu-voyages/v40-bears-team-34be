import mongoose from 'mongoose';

export const connectMongoAtlas = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected to ${conn.connections[0].host}`);
};
