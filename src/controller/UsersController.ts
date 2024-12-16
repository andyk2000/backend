import { createUser, getUserEmail } from "../model/Users";
import { Request, Response } from "express";
import { generateAccessToken, encryptPassword } from "../helper/userhelper";
import { logger } from "../../logger";

const logIn = async (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;
  const encrypted = encryptPassword(password);
  try {
    const user = await getUserEmail(email);
    if (!user || user.password !== encrypted) {
      response.status(404).json({ error: "Login failed. Please try again." });
    } else {
      const token = generateAccessToken(user.email, user.id);
      response.status(200).json({ token });
    }
  } catch (error) {
    logger.error("Error logging in", error);
    response.status(500).json({ error: "Failed to login" });
  }
};

const signUp = async (request: Request, response: Response): Promise<void> => {
  const { names, email, password, typeOfAccount, institutionId, title, phone } =
    request.body;
  try {
    const hashedPassword = encryptPassword(password);
    const newUser = await createUser({
      names,
      email,
      password: hashedPassword,
      typeOfAccount,
      institutionId,
      title,
      phone,
    });
    response.status(201).json(newUser);
  } catch (error) {
    logger.error("Error creating user", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { logIn, signUp };
