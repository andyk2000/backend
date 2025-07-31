import express, { request } from "express";
const appealRouter = express.Router();
import { postAppeal, responseToAppeal } from "../controller/AppealController";

appealRouter.post("/new-appeal", postAppeal);
appealRouter.post("/response", responseToAppeal);

export { appealRouter };
