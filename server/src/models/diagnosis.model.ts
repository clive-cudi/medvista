import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Diagnosis {
    diagnosisId: string;
    patient: string;
    doctor: string;
    date: Date;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    isApproved: boolean;
    isPendingDelete: boolean;
    whitelisted: string[];
}

const diagnosisSchema = new Schema<Diagnosis, Model<Diagnosis>, Diagnosis>({
    diagnosisId: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isPendingDelete: {
        type: Boolean,
        default: false
    },
    whitelisted: [String]
}, {
    timestamps: true,
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export {Diagnosis, diagnosisSchema};