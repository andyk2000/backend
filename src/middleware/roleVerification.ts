import { Request, Response } from "express";
import { logger } from "../../logger";
import { getUserRolebyID } from "../model/Users";

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

export { mdfAdminVerification, endUserVerification, mdfVerification };
