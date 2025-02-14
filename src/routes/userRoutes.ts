import express from "express";
const userRouter = express.Router();
import { emailCheck, logIn, signUp } from "../controller/UsersController";
import {
  emailFormatCheck,
  loginValidation,
  signupValidation,
} from "../middleware/dataValidation";

userRouter.post("/signup", signupValidation, signUp);
userRouter.post("/login", loginValidation, logIn);
userRouter.post("/user/email-check", emailFormatCheck, emailCheck);

export { userRouter };