import express from "express";
const requestRouter = express.Router();
import { emailCheck, logIn, signUp } from "../controller/UsersController";
import {
  emailFormatCheck,
  loginValidation,
  signupValidation,
} from "../middleware/dataValidation";
import {
  getRequestDoctor,
  getRequestID,
  registerRequest,
} from "../controller/RequestController";
import { mdfVerification } from "../middleware/roleVerification";

requestRouter.post("/get/id", getRequestID);
requestRouter.post("/create", registerRequest);
requestRouter.post("/get/dID", getRequestDoctor);

export { requestRouter };
