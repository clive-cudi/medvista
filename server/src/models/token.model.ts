import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

export interface Token {
    userId: string;
    token: string;
}

const tokenSchema = new Schema<Token, Model<Token>, Token>({
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