import express from "express";
const userRouter = express.Router();
import { emailCheck, logIn, signUp } from "../controller/UsersController";
import {
  emailFormatCheck,
  loginValidation,
  signupValidation,
} from "../middleware/dataValidation";

