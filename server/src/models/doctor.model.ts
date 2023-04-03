import mongoose from "mongoose";
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    patients: [String]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export {Doctor, doctorSchema};