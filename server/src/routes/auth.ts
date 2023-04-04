import { Router } from "express";
const router = Router();
import { register, login, confirmEmail, verifyEmail } from "../controllers/auth.controller";

router.post("/register", register);

router.post("/login", login);

router.post("/confirm-email", confirmEmail);

router.post("/verify-email", verifyEmail);

router.get("/me");

export default router;