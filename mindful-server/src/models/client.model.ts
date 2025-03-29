import mongoose, { Document, Schema, ObjectId } from "mongoose";
import validator from 'validator'

export interface IClient extends Document {
    clientId: string;
    primaryConcern: string;
    subscription: string;
}

const ClientSchema: Schema = new Schema ({
    clientId: { type: String, required: true },
    primaryConcern: { type: String },
    subscription: { type: String },
})

export default mongoose.model<IClient>('Client', ClientSchema)