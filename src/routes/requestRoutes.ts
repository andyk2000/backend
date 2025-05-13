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
import { mdfVerification, userCheck } from "../middleware/roleVerification";

requestRouter.post("/get/id", getRequestID);
requestRouter.post("/new-request", registerRequest);
requestRouter.post("/get/ID", getRequestDoctor);

export { requestRouter };
