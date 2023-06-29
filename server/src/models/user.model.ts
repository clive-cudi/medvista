import mongoose, { Model } from "mongoose";
import { doctorSchema, Doctor } from "./doctor.model";
import { patientSchema, Patient } from "./patient.model";
const Schema = mongoose.Schema;

export interface UserType {
    name: string;
    id: string;
    email: string;
    password: string;
    usertype: string;
    doctor: Doctor;
    patient: Patient;
    isVerified: boolean;
    location: string;
    phoneNumber: string;
    phone: string;
    _doc: any;
}

const userSchema = new Schema<UserType, Model<UserType>, UserType>({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    doctor: doctorSchema,
    patient: patientSchema,
    isVerified: {
        type: Boolean,
        default: false
    },
    location: String,
    phoneNumber: String,
    phone: String
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export {User, userSchema};