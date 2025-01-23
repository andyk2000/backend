import express from "express";
const mdfRouter = express.Router();
import { allMDF } from "../controller/MedicalFacilityController";


mdfRouter.get("/mdfs/", allMDF);

export { mdfRouter };