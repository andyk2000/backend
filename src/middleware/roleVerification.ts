import { Request, Response } from "express";
import { logger } from "../../logger";
import { getUserbyID, getUserRolebyID } from "../model/Users";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "zero";

const mdfAdminVerification = async (
  request: Request,
  response: Response,
  next: () => void,
) => {
  const { id } = request.body;
  try {
    const exist = await getUserRolebyID(id);
    if (exist && exist === "md-admin") {
      next();
    } else {
      response.status(500).json({
        error: "user is not an admin at a medical facility",
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "internal server problem please contact your admin",
    });
  }
};

const endUserVerification = async (
  request: Request,
  response: Response,
  next: () => void,
) => {
  const { id } = request.body;
  try {
    const exist = await getUserRolebyID(id);
    if (exist && exist === "md-user") {
      next();
    } else {
      response.status(500).json({
        error: "user is not a user at a medical facility",
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "internal server problem please contact your admin",
    });
  }
};

const mdfVerification = async (
  request: Request,
  response: Response,
  next: () => void,
) => {
  const { id } = request.body;
  try {
    const exist = await getUserRolebyID(id);
    if (exist === "md-admin" || exist === "md-user") {
      next();
    } else {
      response.status(500).json({
        error: "user is not a user at a medical facility",
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "internal server problem please contact your admin",
    });
  }
};

const userCheck = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      error: {
        message: "Auth headers not provided in the request.",
      },
    });
  }

  jwt.verify(authHeader, secretKey, async (err, data) => {
    if (err || !data || typeof data === "string") {
      return res.status(403).json({
        status: false,
        error: "Invalid access token provided, please login again.",
      });
    }
    const user = await getUserbyID(data.id);
    res.locals = {
      user: user,
    };
    next();
  });
};

export {
  mdfAdminVerification,
  endUserVerification,
  mdfVerification,
  userCheck,
};
