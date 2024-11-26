import express from "express";
const userRouter = express.Router();
import { logIn, signUp } from "../controller/UsersController";
import {
  loginValidation,
  signupValidation,
} from "../middleware/dataValidation";

userRouter.post("/signup", signupValidation, signUp);
userRouter.post("/login", loginValidation, logIn);

export { userRouter };