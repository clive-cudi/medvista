import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/auth.controller";

router.post("/register", register);

router.post("/login", login);

router.post("/verify-details");

router.get("/me");

export default router;