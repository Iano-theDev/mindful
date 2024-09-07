import mongoose, { Document, Schema } from "mongoose";
import validator from 'validator'

export interface IUser extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    userName?: string;
    email: string;
    password: string;
    phone?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, index: { unique: true } },
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
    phone: { type: Number, default: null },
}, { timestamps: true, strict: true })

export default mongoose.model<IUser>('User', UserSchema)
