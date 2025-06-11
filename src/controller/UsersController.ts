import { createUser, getUserEmail } from "../model/Users";
import { Request, Response } from "express";
import { generateAccessToken, encryptPassword } from "../helper/userhelper";
import { logger } from "../../logger";

// Helper function to map typeOfAccount to standardized role
const mapTypeToRole = (typeOfAccount: string): string => {
  const roleMap: Record<string, string> = {
    "md-admin": "admin",
    "md-user": "end-user",
    doctor: "doctor",
    "healthcare-provider": "healthcare-provider",
    "medical-advisor": "medical-advisor",
  };

  return roleMap[typeOfAccount] || "end-user";
};

const logIn = async (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;
  
  if (!email || !password) {
    response.status(400).json({
      success: false,
      message: "Email and password are required"
    });
    return;
  }
  
  try {
    const encrypted = encryptPassword(password);
    logger.info(`Attempting login for email: ${email}`);
    
    const user = await getUserEmail(email);
    
    if (!user) {
      logger.info(`Login failed: User with email ${email} not found`);
      response.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
      return;
    }
    
    if (user.password !== encrypted) {
      logger.info(`Login failed: Password mismatch for ${email}`);
      response.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
      return;
    }
    
    // Map typeOfAccount to standardized role format
    const role = mapTypeToRole(user.typeOfAccount);
    
    const token = generateAccessToken(
      user.email,
      user.id,
      user.typeOfAccount
    );
    
    logger.info(`Login successful for user: ${user.email}`);
    
    // Return token and user data in the expected format
    response.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.names,
        email: user.email,
        role
      }
    });
  } catch (error) {
    logger.error("Error during login:", error);
    response.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const signUp = async (request: Request, response: Response): Promise<void> => {
  const { names, email, password, institutionId, title, phone, typeOfAccount } =
    request.body;
  try {
    const hashedPassword = encryptPassword(password);
    console.log(names,  email, hashedPassword, institutionId, title, phone, typeOfAccount);
    const newUser = await createUser({
      names,
      email,
      password: hashedPassword,
      institutionId,
      typeOfAccount: "md-user",
      title,
      phone,
    });
    response.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.names,
        email: newUser.email,
        role: mapTypeToRole(newUser.typeOfAccount),
      },
    });
  } catch (error) {
    logger.error("Error creating user", error);
    response.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

const emailCheck = async (request: Request, response: Response) => {
  const { email } = request.body;
  try {
    const user = await getUserEmail(email);
    if (user) {
      response.status(200).json({ result: "user found" });
    } else {
      response.status(500).json({ resul: "user not found" });
    }
  } catch (error) {
    logger.error("Error retrieving user with email:", email);
    response
      .status(500)
      .json({ result: "Error retrieving user with email:" + email });
  }
};

export { logIn, signUp, emailCheck };

