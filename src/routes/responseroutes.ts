import express from "express";
const responseRouter = express.Router();
import { postResponse, getResponse  } from "../controller/ResponseController";

responseRouter.post("/new-response", postResponse);
responseRouter.post("/get/response", getResponse);

export { responseRouter };