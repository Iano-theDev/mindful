import mongoose, { Document, Schema, ObjectId } from "mongoose";
import validator from 'validator'

export interface IClient extends Document {
    clientId: string;
    age: number;
    nationality: string;
    occupation: string;
    primaryConcern: string;
    subscription: string;
}

const ClientSchema: Schema = new Schema ({
    clientId: { type: String, required: true },
    age: { type: Number },
    nationality: { type: String },
    occupation: { type: String },
    primaryConcern: { type: String },
    subscription: { type: String },
})

export default mongoose.model<IClient>('Client', ClientSchema)