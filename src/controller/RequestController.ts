import { createPatient } from "../model/Patients";
import { Request, Response } from "express";
import { logger } from "../../logger";

const registerRequest = async (request: Request, response: Response) => {
  const { date, patientId, medicalfacilityId, title, description, resources, status } =
    request.body;
};
