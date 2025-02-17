import express from "express";
const patientRouter = express.Router();
import { getPatient, registerNewPatient } from "../controller/PatientController";
import {
  patientValidation,
} from "../middleware/dataValidation";

patientRouter.post("/new-patient", patientValidation, registerNewPatient);
patientRouter.post("/get-patient-personal-Id", getPatient);

export { patientRouter };