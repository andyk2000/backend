import {
  findAllMDFName,
  findMDFByID,
  findMDFByName,
  MedicalFacility,
  updateMDAdmin,
} from "../model/MedicalFacilities";
import { Request, Response } from "express";
import { logger } from "../../logger";

const allMDF = async (request: Request, response: Response) => {
  try {
    const mdfs = await findAllMDFName();
    response.status(200).json({
      success: true,
      data: mdfs
    });
  } catch (error) {
    logger.error("Error retrieving medical facilities", error);
    response.status(500).json({ 
      success: false, 
      message: "Failed to retrieve medical facilities" 
    });
  }
};

const findMDFByN = async (request: Request, response: Response) => {
  const { name } = request.body;
  const mdf = await findMDFByName(name);
  response.status(200).json({ mdf });
};

const mdfById = async (request: Request, response: Response): Promise<void> => {
  try {
    const { id } = request.body;
    const facility = await findMDFByID(id);
    
    if (!facility) {
      response.status(404).json({
        success: false,
        message: "Medical facility not found"
      });
      return;
    }
    
    response.status(200).json({
      success: true,
      data: facility
    });
  } catch (error) {
    logger.error("Error retrieving medical facility", error);
    response.status(500).json({ 
      success: false, 
      message: "Failed to retrieve medical facility" 
    });
  }
};

const updateAdminMDF = async (request: Request, response: Response) => {
  const { mdfid, id } = request.body;
  try {
    const mdf = await updateMDAdmin({ adminId: id }, mdfid);
    response.status(200).json({ mdf });
  } catch (error) {
    logger.info("failed to update the admin of the medical facility");
    response.status(500).json({ error: "Internal server error:" + error });
  }
};

export { allMDF, mdfById, updateAdminMDF, findMDFByN };



