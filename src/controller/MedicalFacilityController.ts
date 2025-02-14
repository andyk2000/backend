import { findAllMDFName, findMDFByID } from "../model/MedicalFacilities";
import { Request, Response } from "express";
import { logger } from "../../logger";
import { error } from "console";

const allMDF = async (request: Request, response: Response) => {
  try {
    const mdfs = await findAllMDFName();
    response.status(201).json(mdfs);
  } catch (error) {
    logger.error("Error creating new medical facility", error);
    response.status(500).json({ error: "Internal Server Error: " + error });
  }
};

const mdfById = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const mdf = await findMDFByID(id);
    if (mdf) {
      response.status(200).json({
        result: true,
        mdf: mdf,
      });
    } else {
      logger.info("Medical facility not found with id:", id);
      response.status(500).json({ error: "medical facility not found" });
    }
  } catch (error) {
    logger.error("error retrieving medical facility", error);
    response.status(500).json({ error: "Internal Server Error: " + error });
  }
};

export { allMDF, mdfById };
