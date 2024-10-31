import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import fileUpload from "express-fileupload";
import express, { Express } from "express";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

interface Config {
  host: string;
  user: string;
  password: string;
  database: string;
  frontend: string;
}

const config: Config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "mydatabase",
  frontend: process.env.FRONTEND_LINK || "urubuto",
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
  logging: false,
});

app.use(express.static("public"));

app.listen(port, async () => {
  await sequelize.sync({ alter: true });
  console.log("Server Listening on PORT:", port);
});