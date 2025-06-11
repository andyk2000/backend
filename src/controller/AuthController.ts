import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../logger";
import { getUserbyID } from "../model/Users";
import { secretKey } from "../helper/userhelper";

// Helper function to map typeOfAccount to standardized role
const mapTypeToRole = (typeOfAccount: string): string => {
  const roleMap: Record<string, string> = {
    "md-admin": "admin",
    "md-user": "end-user",
    mda: "medical advisor",
  };

  return roleMap[typeOfAccount] || "end-user";
};

const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        valid: false,
        message: "Authorization header missing or invalid format",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
      if (err) {
        logger.error("Token verification failed:", err);
        res.status(401).json({
          valid: false,
          message: "Invalid or expired token",
        });
        return;
      }

      try {
        const user = await getUserbyID(decoded.id);

        if (!user) {
          res.status(401).json({
            valid: false,
            message: "User not found",
          });
          return;
        }

        res.status(200).json({
          valid: true,
          user: {
            id: user.id,
            name: user.names,
            email: user.email,
            role: mapTypeToRole(user.typeOfAccount),
          },
        });
      } catch (error) {
        logger.error("Error retrieving user:", error);
        res.status(500).json({
          valid: false,
          message: "Server error while verifying user",
        });
      }
    });
  } catch (error) {
    logger.error("Error in verifyToken:", error);
    res.status(500).json({
      valid: false,
      message: "Internal server error",
    });
  }
};

export { verifyToken };
