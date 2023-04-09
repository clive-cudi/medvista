import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Doctor extends mongoose.Document {
    id: string;
    name: string;
    patients: string[];
    pendingApprovals: string[];
    pendingDeletions: string[];
    activePatients: string[];
    inActivePatients: string[];
    archivedPatients: string[];
}

const doctorSchema = new Schema<Doctor, Model<Doctor>, Doctor>({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    patients: [String],
    // diagnosis approval requests
    pendingApprovals: [String],
    // diagnosis deletion requests
    pendingDeletions: [String],
    activePatients: [String],
    inActivePatients: [String],
    archivedPatients: [String]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export {Doctor, doctorSchema};