import { findAllMDFName } from "../model/MedicalFacilities";
import { Request, Response } from "express";
import { logger } from "../../logger";

const allMDF = async (request: Request, response: Response) => {
  try {
    const mdfs = await findAllMDFName();
    response.status(201).json(mdfs);
  } catch (error) {
    logger.error("Error creating new store");
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { allMDF };
