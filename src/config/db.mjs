import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.mjs';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await initCollections();
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const initCollections = async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    const requiredCollections = ['users']; // Add all required collections here

    for (const collection of requiredCollections) {
        if (!collectionNames.includes(collection)) {
            await mongoose.connection.db.createCollection(collection);
            console.log(`Collection ${collection} created.`);
        }
    }
};

export default connectDB;
