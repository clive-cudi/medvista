import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
});

const Token = mongoose.model("Token", tokenSchema);

export {Token, tokenSchema};