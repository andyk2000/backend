import express from "express";
const patientRouter = express.Router();
import {
  getPatient,
  getPatients,
  registerNewPatient,
} from "../controller/PatientController";
import { patientValidation } from "../middleware/dataValidation";

patientRouter.post("/new-patient", patientValidation, registerNewPatient);
patientRouter.post("/get-patient-Id", getPatient);
patientRouter.get("/all-patients", getPatients);

export { patientRouter };
