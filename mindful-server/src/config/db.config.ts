import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';

export const connectDB = async (): Promise<void> => {
    try {
        const mongo_uri = config.mongo_uri
        await mongoose.connect(mongo_uri)
        console.log("MongoDB connected successfully");

    } catch (error: any) {
        console.error('MongoDB connection error: ', error.message)
    }
}