import slugify from "slugify";
import { getPatientById } from "../model/Patients";

const identificationGenerator = (lastId: string, age: string) => {
  const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
  const UniqueIdentifier = slugify(lastId + "000" + age + randomNum);
  return parseInt(UniqueIdentifier);
};

const dependentIdentification = (
  id: string,
  age: string,
  idDependent: string,
) => {
  const firstIdentification = identificationGenerator(id, age);
  const finalIdentification = slugify(
    firstIdentification.toString(),
    idDependent,
  );
  return finalIdentification;
};

const getPatientIdentification = async (identification: number) => {
  console.log("identification", identification);
  return await getPatientById(identification);
};

export {
  identificationGenerator,
  dependentIdentification,
  getPatientIdentification,
};
