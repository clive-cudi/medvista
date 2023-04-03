import express from "express";
const app = express();
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import AuthRouter from "./routes/auth";


dotenv.config({ path: path.resolve(__dirname, "../.env.local")})
const PORT = process.env.SERVER_PORT ?? 4000;
const MONGO_URI = process.env.SERVER_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;

app.use(cors());

app.use(express.json());

app.use(logger("dev"));


mongoose.connect(MONGO_URI ?? "").then(() => {
    console.log("[INFO] Connected to DB");
}).catch((mongo_connect_err) => {
    console.log(mongo_connect_err);
    console.log("[ERROR] Failed to connect to DB");
})

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to medVista API!");
});

app.use("/auth", AuthRouter);


app.listen(PORT, () => {
    console.log(`Server up on PORT: ${PORT}`)
})