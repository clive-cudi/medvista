import { Router } from "express";
const router = Router();
import { register, login, confirmEmail, verifyEmail, addOTP, verifyOTP } from "../controllers/auth.controller";

router.post("/register", register);

router.post("/login", login);

router.post("/confirm-email", confirmEmail);

router.post("/verify-email", verifyEmail);

router.get("/me");

router.post("/otp", addOTP);

router.delete("/otp", verifyOTP);

export default router;

"http://localhost:3000/auth/verify-email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ODc2NSIsImVtYWlsIjoiY2xpdmVmbGF2aXVzNDFAZ21haWwuY29tIiwibmFtZSI6IkNsaXZlIEZsYXZpdXMiLCJ1c2VydHlwZSI6InBhdGllbnQiLCJpYXQiOjE2ODA1OTYzNjMsImV4cCI6MTY4MDYwMzU2M30.ErrN55sPPfkV5xtRG29YlMAZjENc6ATx8AvgvmIvX9g"