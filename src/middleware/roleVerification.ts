import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserbyID } from "../model/Users";
import { secretKey } from "../helper/userhelper";
import { logger } from "../../logger";

const userCheck = (req: Request, res: Response, next: NextFunction): void => {
  // Check for Authorization header (Bearer token)
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.info("Authorization header missing or invalid format");
    res.status(401).json({
      success: false,
      message: "Authorization header missing or invalid format"
    });
    return;
  }

  // Extract token from Bearer format
  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, async (err: any, decoded: any) => {
    if (err) {
      logger.error("Token verification failed:", err);
      res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
      return;
    }
    
    try {
      const user = await getUserbyID(decoded.id);
      
      if (!user) {
        logger.info(`User not found for ID: ${decoded.id}`);
        res.status(401).json({
          success: false,
          message: "User not found"
        });
        return;
      }
      
      // Attach user to res.locals for use in route handlers
      res.locals.user = user;
      next();
    } catch (error) {
      logger.error("Error retrieving user:", error);
      res.status(500).json({
        success: false,
        message: "Server error while verifying user"
      });
    }
  });
};

// Add the mdfAdminVerification middleware for medical facility routes
const mdfAdminVerification = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = res.locals.user;
    
    // Check if user exists and is an admin
    if (!user || user.typeOfAccount !== "md-admin") {
      logger.info(`Admin verification failed for user: ${user?.id}`);
      res.status(403).json({
        success: false,
        message: "User is not authorized to perform this action"
      });
      return;
    }
    
    next();
  } catch (error) {
    logger.error("Error in admin verification:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying admin privileges"
    });
  }
};

export { userCheck, mdfAdminVerification };





