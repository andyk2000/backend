import Crypto from "crypto";
import jwt from "jsonwebtoken";

interface Config {
  secretKey: string;
}

const config: Config = {
  secretKey: process.env.SECRET_KEY || "your-secret-key-for-development",
};

// Export the secretKey for use in other modules
export const secretKey = config.secretKey;

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
      expiresIn: "24h", // Longer expiration for better user experience
    },
  );
};

const encryptPassword = (password: string) => {
  const hash = Crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

export { generateAccessToken, encryptPassword };


