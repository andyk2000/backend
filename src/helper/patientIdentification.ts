import slugify from "slugify";

const identificationGenerator = (lastId: string, age: string) => {
  const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
  const UniqueIdentifier = slugify(lastId+"000" + age + randomNum);
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

export { identificationGenerator, dependentIdentification };
