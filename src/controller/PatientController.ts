import { createPatient, getPatientById } from "../model/Patients";
import { Request, Response } from "express";
import { logger } from "../../logger";

const registerNewPatient = async (request: Request, response: Response) => {
  const { names, age, address, sex, dependent, nationalId, phone, patientIdentification } =
    request.body;
  try {
    const newUser = await createPatient({
      names,
      phone,
      age,
      address,
      sex,
      dependent,
      nationalId,
      patientIdentification
    });
  } catch (error) {
    logger.error("Error creating patient: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatient = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const patient = await getPatientById(id);
    response.status(200).json({ patient });
  } catch (error) {
    logger.error("error", error);
    response.status(500).json("Internal server Error");
  }
};

export { registerNewPatient, getPatient };
