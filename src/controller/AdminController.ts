import { Request, Response } from "express";
import { logger } from "../../logger";
import { getAllUsers, getUserbyID, updateUserStatus } from "../model/Users";

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

const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await getAllUsers();

    // Map users to the expected format
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.names,
      email: user.email,
      role: mapTypeToRole(user.typeOfAccount),
      title: user.title,
      phone: user.phone,
      institutionId: user.institutionId,
    }));

    res.status(200).json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    logger.error("Error getting all users", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

const getUserByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserbyID(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: userId,
        name: user.names,
        email: user.email,
        role: mapTypeToRole(user.typeOfAccount),
        title: user.title,
        phone: user.phone,
        institutionId: user.institutionId,
      },
    });
  } catch (error) {
    logger.error(`Error getting user by ID: ${req.params.id}`, error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
};

const updateUserStatusController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { status } = req.body;

    await updateUserStatus(userId, status);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    logger.error(`Error updating user status: ${req.params.id}`, error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // User is already attached to res.locals by the userCheck middleware
    const user = res.locals.user;
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.names,
        email: user.email,
        role: mapTypeToRole(user.typeOfAccount),
        title: user.title,
        phone: user.phone,
        institutionId: user.institutionId
      }
    });
  } catch (error) {
    logger.error("Error getting user profile", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user profile"
    });
  }
};

export {
  getAllUsersController,
  getUserByIdController,
  updateUserStatusController,
  getUserProfile,
};

