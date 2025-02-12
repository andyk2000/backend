import express from "express";
const patientRouter = express.Router();
import { registerNewPatient } from "../controller/PatientController";
import {
  patientValidation,
} from "../middleware/dataValidation";

patientRouter.post("/new-request", patientValidation, registerNewPatient);

export { patientRouter };