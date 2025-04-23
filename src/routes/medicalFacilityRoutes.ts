import express from "express";
const mdfRouter = express.Router();
import {
  allMDF,
  mdfById,
  updateAdminMDF,
} from "../controller/MedicalFacilityController";
import { mdfFormatCheck, mdfIdFormatCheck } from "../middleware/dataValidation";
import { mdfAdminVerification } from "../middleware/roleVerification";

mdfRouter.get("/", allMDF);
mdfRouter.post("/by-id", mdfIdFormatCheck, mdfById);
mdfRouter.post(
  "/admin-change",
  [mdfFormatCheck, mdfAdminVerification],
  updateAdminMDF,
);

export { mdfRouter };
