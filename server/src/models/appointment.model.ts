import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Appointment {
    appointmentId: string;
    patient: string;
    doctor: string;
    date: Date
    time: string
    duration: number
}

const appointmentSchema = new Schema<Appointment, Model<Appointment>, Appointment>({
    appointmentId: {
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
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export {Appointment, appointmentSchema};