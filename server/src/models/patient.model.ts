import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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