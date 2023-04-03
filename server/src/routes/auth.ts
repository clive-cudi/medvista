import { Router } from "express";
const router = Router();
import { register, login, confirmEmail } from "../controllers/auth.controller";

router.post("/register", register);

router.post("/login", login);

router.post("/verify-details");

router.post("/confirm-email", confirmEmail);

router.get("/me");

export default router;