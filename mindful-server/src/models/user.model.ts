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
        client: boolean;
        therapist: boolean;
        studentTherapist: boolean;
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
        client: {type: Boolean,  default: false},
        therapist: {type: Boolean,  default: false},
        studentTherapist: {type: Boolean,  default: false}
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

UserSchema.pre<any>('save', function(next) {
    if (this.role.therapist && this.role.studentTherapist) {
        const error = new ValidationError('User cannot be both therapist and student therapist');
        return next(error);
    }
    next();
});

export default mongoose.model<IUser>('User', UserSchema)
