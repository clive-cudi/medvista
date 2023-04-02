import { Router } from "express";
const router = Router();

router.post("/register");

router.post("/login");

router.post("/verify-details");

router.get("/me");

export default router;