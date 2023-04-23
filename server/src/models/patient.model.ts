import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Patient extends mongoose.Document {
    id: string;
    name: string;
    diagnoses: string[];
    doctors: string[];
    activeDoctors: string[];
    inActiveDoctors: string[];
    archivedDoctors: string[];
    pendingGlimpse: string[];
}

const patientSchema = new Schema<Patient, Model<Patient>, Patient>({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    doctors: [String],
    diagnoses: [String],
    activeDoctors: [String],
    // pending medical records access requests
    inActiveDoctors: [String],
    // have no access to medical records
    archivedDoctors: [String],
    pendingGlimpse: [String],
});

const Patient = mongoose.model("Patient", patientSchema);

export {Patient, patientSchema};