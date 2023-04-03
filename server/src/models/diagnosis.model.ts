import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
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
    }
}, {
    timestamps: true,
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export {Diagnosis, diagnosisSchema};