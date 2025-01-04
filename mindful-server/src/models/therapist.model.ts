import mongoose, { Document, Schema, ObjectId } from "mongoose";
import validator from 'validator'

export interface ITherapist extends Document {
    therapistId: string;
    email: string,
    age: number;
    nationality?: string;
    occupation: string;
    qualification: string;
    yearsOfExperience: number; 
    specialization: string[];
    licenseNumber: string;
    rating: number;
    hourlyRate: number;
}

const TherapistSchema: Schema = new Schema ({
    therapistId: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    age: { type: Number, required: true },
    nationality: { type: String },
    occupation: { type: String },
    qualification: { type: String },
    yearsOfExperience: { type: Number, required: true },
    specialization: [String],
    licenseNumber: { type: String, unique: true },
    rating: { type: Number, min: 0, max: 5 },
    hourlyRate: { type: Number, default: 0 },
})

export default mongoose.model<ITherapist>('Therapist', TherapistSchema)