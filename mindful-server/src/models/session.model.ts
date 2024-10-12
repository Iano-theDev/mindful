import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'

export interface ITherapySession extends Document, IClientSessionData, ITherapistSessionData {
    sessionStatus: string;
    sessionDuration: string;
    startTime: Date;
    rescheduledStartTime?: Date;
    clientData: IClientSessionData;
    therapistData: ITherapistSessionData;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IClientSessionData {
    supportingDocs: string // link to blob 
    clientId: string;
    notes: string
    therapistRating: number;
    therapistReview: string;
    sessionRating: number;
    sessionTechnicalErrorDesc: string;
}

export interface ITherapistSessionData {
    supportingDocs: string // link to blob 
    therapistId: string;
    notes: string
    remarks: string
    clientRating: number;
    sessionRating: number;
    sessionTechnicalErrorDesc: string;
}


const TherapySessionSchema: Schema = new Schema({
    sessionStatus: { type: String, required: true }, // create a string identifer enum to list session status [active, rescheduled, canceled, complete]
    sessionDuration: { type: String, required: true },
    startTime: { type: Date, required: true },
    rescheduledStartTime: { type: Date, default: null},
    clientData: {
        supportingDocs: { type: String, default: null }, // link to blob or some storage il figure out
        clientId: { type: String, required: true },
        notes: { type: String, default: null }, // session status must be active to take notes
        therapistRating: { type: Number, required: true, min: 1, max: 5, default: null}, // these fields cannot be modified if session status is not complete
        therapistReview: { type: String, required: true },
        sessionRating: { type: Number, required: true, min: 1, max: 5 }, // session has to have ended
        sessionTechnicalErrorDesc: { type: String, required: true }, 
    },
    therapistData: {
        supportingDocs: { type: String, required: true }, // link to blob
        therapistId: { type: String, required: true },
        notes: { type: String, required: true },
        remarks: { type: String, required: true },
        clientRating: { type: Number, required: true, min: 1, max: 5 },
        sessionRating: { type: Number, required: true, min: 1, max: 5 },
        sessionTechnicalErrorDesc: { type: String, required: true },
    }
}, { timestamps: true, strict: true })


export default mongoose.model('TherapySession', TherapySessionSchema)
