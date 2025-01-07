import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';
import winston from "winston"

// TODO
// implement session connection per user after authentication

export const connectDB = async (): Promise<void> => {
    try {
        const mongo_uri = config.mongo_uri
        await mongoose.connect(mongo_uri)
        winston.info("MongoDB connected successfully");

    } catch (error: any) {
        winston.error('MongoDB connection error: ', error.message)
    }
}