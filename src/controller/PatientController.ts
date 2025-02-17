import { createPatient, getPatientById } from "../model/Patients";
import { Request, Response } from "express";
import { logger } from "../../logger";
import { identificationGenerator } from "../helper/patientIdentification";

const registerNewPatient = async (request: Request, response: Response) => {
  const { names, age, address, sex, dependent, nationalId, phone } =
    request.body;
  const patientIdentification = identificationGenerator("1", age.toString());
  try {
    const newUser = await createPatient({
      names,
      phone,
      age,
      address,
      sex,
      dependent,
      nationalId,
      patientIdentification,
    });
    response.status(200).json(newUser);
  } catch (error) {
    logger.error("Error creating patient: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatient = async (request: Request, response: Response) => {
  const { id } = request.body;
  console.log(id);
  try {
    const patient = await getPatientById(id);
    console.log(patient);
    response.status(200).json({ patient });
  } catch (error) {
    logger.error("error", error);
    response.status(500).json("Internal server Error");
  }
};

export { registerNewPatient, getPatient };
