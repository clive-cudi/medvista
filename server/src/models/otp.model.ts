import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Otp {
    otp: string;
    phone: string;
}

const otpSchema = new Schema<Otp, Model<Otp>, Otp>({
    otp: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Otp = mongoose.model("Otp", otpSchema);

export {Otp, otpSchema};