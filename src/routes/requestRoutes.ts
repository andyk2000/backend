import express from "express";
const requestRouter = express.Router();
import {
  getRequestDoctor,
  getRequestID,
  registerRequest,
} from "../controller/RequestController";
// import { userCheck } from "../middleware/roleVerification";

requestRouter.post("/get/id", getRequestID);
requestRouter.post("/new-request", registerRequest);
requestRouter.post("/get/ID", getRequestDoctor);

export { requestRouter };




