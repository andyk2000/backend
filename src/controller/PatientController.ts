import { createPatient } from "../model/Patients";
import { Request, Response } from "express";
import { logger } from "../../logger";

const registerNewPatient = async (request: Request, response: Response) => {
  const { names, age, address, sex, dependent, nationalId, phone } =
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
    });
  } catch (error) {
    logger.error("Error creating patient: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerNewPatient };
