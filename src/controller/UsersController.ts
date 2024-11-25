import { createUser } from "../model/Users";
import { Request, Response } from "express";
import { generateAccessToken, encryptPassword } from "../helper/userhelper";

const logIn = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const encrypted = encryptPassword(password);
  try {
    const user = await getUserEmail(email);
    if (!user || user.password !== encrypted) {
      return response
        .status(404)
        .json({ error: "Login failed. Please try again." });
    }
  } catch (error) {
    // logger.error("Error loggingin", error);
    return response.status(500).json({ error: "Failed to login" });
  }
};
