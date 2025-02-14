import express from "express";
const mdfRouter = express.Router();
import { allMDF, mdfById } from "../controller/MedicalFacilityController";
import { mdfIdFormatCheck } from "../middleware/dataValidation";


mdfRouter.get("/", allMDF);
mdfRouter.post("/by-id", mdfIdFormatCheck, mdfById);

export { mdfRouter };