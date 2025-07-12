import mongoose, { Document, Schema } from "mongoose";
import validator from 'validator'
import { ValidationError } from "./error.model";

export interface IUser extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    userName?: string;
    DOB?: string;
    nationality?: string;
    occupation?: string;
    email: string;
    password: string;
    isOnline: boolean;
    role: {
        client: {
            active: boolean;
            label: string;
        };
        therapist: {
            active: boolean;
            label: string;
        };
        studentTherapist: {
            active: boolean;
            label: string;
        };
    };
    // phone?: number;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    DOB: { type: String},
    nationality: { type: String },
    occupation: { type: String },
    userName: { type: String, required: true, index: { unique: true } },
    isOnline: { type: Boolean, default: false },
    // role: { 
    //     type: String,
    //     enum: ["client", "therapist"]
    // },
     role: { 
        client: {
            active: { type: Boolean, default: false },
            label: { type: String, default: "Client" }
        },
        therapist: {
            active: { type: Boolean, default: false },
            label: { type: String, default: "Therapist" }
        },
        studentTherapist: {
            active: { type: Boolean, default: false },
            label: { type: String, default: "Student Therapist" }
        }
    },
    email: {
        type: String,
        required: [true, 'email is required'], 
        index: { unique: true },
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: { 
        type: String,
        required: [true, 'password is required'],
        validate: {
            validator: validator.isStrongPassword,
            message: "use a stronger password"
        }
    },
    // phone: { type: Number, default: null },
    phone: { type: String, default: null },
}, { timestamps: true, strict: true })

export default mongoose.model<IUser>('User', UserSchema)
