import { Router } from "express";
const router = Router();
import { verifyToken, patient_verify } from "../middleware";
import {
  getMyDoctors,
  getMyDoctorsIDs,
  createMedicalHistory,
  deleteMedicalHistory,
  getMedicalHistory,
  getMedicalHistoryByID,
  getPatientById,
  updateMedicalHistory,
  searchPatient,
  bookAppointment,
  updateAppointment,
  removeAppointment,
  getAppointments,
  getAppointmentByID,
  approveMedicalGlimpseRequest,
} from "../controllers/patient.controller";

// get patient profile by id
router.get("/profile/:id", verifyToken, getPatientById);

// get all medical history
router.get("/medical-history", verifyToken, patient_verify, getMedicalHistory);

// get medical history by id
router.get(
  "/medical-history/:id",
  verifyToken,
  patient_verify,
  getMedicalHistoryByID
);

// create medical history with doctor's approval
router.post(
  "/medical-history",
  verifyToken,
  patient_verify,
  createMedicalHistory
);

// update medical history with doctor's approval
router.post(
  "/medical-history/:id",
  verifyToken,
  patient_verify,
  updateMedicalHistory
);

// delete medical history with doctor's approval
router.delete(
  "/medical-history/:id",
  verifyToken,
  patient_verify,
  deleteMedicalHistory
);

// get all appointments
router.get("/appointments", verifyToken, getAppointments);

// get appointment by id
router.get("/appointments/:id", verifyToken, getAppointmentByID);

// create appointment
router.post("/appointments", verifyToken, patient_verify, bookAppointment);

// update appointment
router.post("/appointments/:id", verifyToken, updateAppointment);

// delete appointment
router.delete("/appointments/:id", verifyToken, removeAppointment);

// get my doctors
router.get("/my-doctors-ids", verifyToken, patient_verify, getMyDoctorsIDs);

// get my doctors
router.get("/my-doctors", verifyToken, patient_verify, getMyDoctors);

// get my doctor by id
router.get("/my-doctors/:id", verifyToken, patient_verify);

// remove doctor
router.delete("/my-doctors/:id", verifyToken, patient_verify);

// approve doctor request for viewing medical history
router.post(
  "/my-doctors/:id/approve-glimpse",
  verifyToken,
  patient_verify,
  approveMedicalGlimpseRequest
);

// get pending medical glimpse approvals
router.get("/my-doctors/glimpse-approvals", verifyToken, patient_verify);

// router.post(
//   "/my-doctors/approve-glimpse",
//   verifyToken,
//   patient_verify,
//   approveMedicalGlimpseRequest
// );

// deny medical glimpse to doctor request
router.delete("/my-doctors/revoke-glimpse", verifyToken, patient_verify);

// search patient by name
router.get("/search/:name", verifyToken, searchPatient);

export default router;
