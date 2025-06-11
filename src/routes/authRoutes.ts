import express from "express";
import { verifyToken } from "../controller/AuthController";

const authRouter = express.Router();

// This route should be accessible without authentication
authRouter.get("/verify", verifyToken);

export { authRouter };

