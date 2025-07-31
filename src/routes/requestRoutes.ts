import express, { request } from "express";
const requestRouter = express.Router();
import {
  getAllRequests,
  getRequestAppeal,
  getRequestDoctor,
  getRequestID,
  registerRequest,
  requestResponse,
} from "../controller/RequestController";
// import { userCheck } from "../middleware/roleVerification";

requestRouter.post("/get/id", getRequestID);
requestRouter.post("/new-request", registerRequest);
requestRouter.post("/get/doctor/id", getRequestDoctor);
requestRouter.get("/all-requests", getAllRequests);
requestRouter.post("/response", requestResponse);
requestRouter.post("/appeal", getRequestAppeal);
requestRouter.post("/pdf-report", getRequestAppeal);

export { requestRouter };


