import { Router } from "express";
const router = Router();
import { verifyToken, doctor_verify } from "../middleware";
import { getAllPatients, getPatientById, searchDoctorsByName, requestMedicalGlimpse, revokeMedicalGlimpseRequest, getPatientMedicalHistory } from "../controllers/doctor.controller";

// view all patients
router.get("/patients", verifyToken, doctor_verify, getAllPatients);

// view patient by id
router.get("/patients/:id", verifyToken, doctor_verify, getPatientById);

// request to view patient's medical history
router.post("/patients/:id/request", verifyToken, doctor_verify, requestMedicalGlimpse);

// revoke medical glimpse request
router.delete("/patients/:id/revoke", verifyToken, doctor_verify, revokeMedicalGlimpseRequest);

// view all appointments
router.get("/appointments", verifyToken, doctor_verify);

// view appointment by id
router.get("/appointments/:id", verifyToken, doctor_verify);

// create appointment
router.post("/appointments", verifyToken, doctor_verify);

// update appointment
router.post("/appointments/:id", verifyToken, doctor_verify);

// delete appointment
router.delete("/appointments/:id", verifyToken, doctor_verify);

// create diagnosis
router.post("/diagnosis", verifyToken, doctor_verify);

// update diagnosis
router.post("/diagnosis/:id", verifyToken, doctor_verify);

// delete diagnosis
router.delete("/diagnosis/:id", verifyToken, doctor_verify);

// view patient's medical history with patient's approval
router.get("/patients/:id/medical-history", verifyToken, doctor_verify, getPatientMedicalHistory);

// view patient's medical history by id

// search for a doctor by name
router.get("/search/:name", verifyToken, searchDoctorsByName);

export default router;