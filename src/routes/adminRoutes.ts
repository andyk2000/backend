import express from "express";
import { 
  getAllUsersController, 
  getUserByIdController, 
  updateUserStatusController,
  getUserProfile
} from "../controller/AdminController";
import { userCheck, mdfAdminVerification } from "../middleware/roleVerification";

const adminRouter = express.Router();

// Admin routes - require authentication and admin privileges
adminRouter.get("/users", userCheck, mdfAdminVerification, getAllUsersController);
adminRouter.get("/users/:id", userCheck, mdfAdminVerification, getUserByIdController);
adminRouter.put("/users/:id/status", userCheck, mdfAdminVerification, updateUserStatusController);

// User profile route - requires authentication but not admin privileges
adminRouter.get("/profile", userCheck, getUserProfile);

export { adminRouter };





