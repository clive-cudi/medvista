import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;
import { Appointment, appointmentSchema } from "./appointment.model";

export interface Doctor extends mongoose.Document {
    id: string;
    name: string;
    speciality: string;
    profilePicture: string;
    patients: string[];
    pendingApprovals: string[];
    pendingDeletions: string[];
    activePatients: string[];
    inActivePatients: string[];
    archivedPatients: string[];
    pendingMedicalGlimpseRequests: string[];
    appointments: string[]
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
    speciality: String,
    profilePicture: String,
    patients: [String],
    // diagnosis approval requests
    pendingApprovals: [String],
    // diagnosis deletion requests
    pendingDeletions: [String],
    activePatients: [String],
    inActivePatients: [String],
    archivedPatients: [String],
    pendingMedicalGlimpseRequests: [String],
    appointments: [String]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export {Doctor, doctorSchema};


// [TODO] - a doctor can have multiple specialities - change this to an array of strings
// the doctor can have a specific speciality for each patient
// [TODO: DONE] - add a field for the doctor's profile picture