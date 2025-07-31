import express from "express";
const userRouter = express.Router();
import { blockUser, emailCheck, getAllUserData, logIn, signUp } from "../controller/UsersController";
import {
  emailFormatCheck,
  loginValidation,
  signupValidation,
} from "../middleware/dataValidation";

userRouter.post("/signup", signUp);
userRouter.post("/login", loginValidation, logIn);
userRouter.post("/user/email-check", emailFormatCheck, emailCheck);
userRouter.get("/all-users", getAllUserData);
userRouter.post("/block-user", blockUser);

export { userRouter };
