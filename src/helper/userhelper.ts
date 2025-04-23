import Crypto from "crypto";
import path from "path";
import { promisify } from "util";
import jwt from "jsonwebtoken";

interface Config {
  secretKey: string;
}

const config: Config = {
  secretKey: process.env.SECRET_KEY || "",
};

const generateAccessToken = (
  email: string,
  id: number,
  typeOfAccount: string,
) => {
  return jwt.sign(
    {
      id,
      email,
      typeOfAccount,
    },
    config.secretKey,
    {
      expiresIn: 3600,
    },
  );
};

const encryptPassword = (password: string) => {
  const hash = Crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

export { generateAccessToken, encryptPassword };
