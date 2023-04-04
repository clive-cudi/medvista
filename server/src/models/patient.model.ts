import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Patient extends mongoose.Document {
    id: string;
    name: string;
    diagnoses: string[];
    doctors: string[];
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
    diagnoses: [String]
});

const Patient = mongoose.model("Patient", patientSchema);

export {Patient, patientSchema};