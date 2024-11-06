import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import fileUpload from "express-fileupload";
import express, { Express } from "express";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { Appeal, initializeAppeal } from "./model/Appeals";
import { Bill, initializeBill } from "./model/Bills";
import { initializeMedicalFacility, MedicalFacility } from "./model/MedicalFacilities";
import { initializePatient, Patient } from "./model/Patients";
import { initializeRequest, Request } from "./model/Requests";
import { initializeResponse, Response } from "./model/Responses";
import { initializeUser, User } from "./model/Users";
import { errors } from "celebrate";

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

initializeAppeal(sequelize);
initializeBill(sequelize);
initializeMedicalFacility(sequelize);
initializePatient(sequelize);
initializeRequest(sequelize);
initializeResponse(sequelize);
initializeUser(sequelize);

User.belongsTo(MedicalFacility);
MedicalFacility.hasMany(User);
Bill.belongsTo(MedicalFacility);
MedicalFacility.hasMany(Bill);
Request.belongsTo(User);
User.hasMany(Request);
Request.belongsTo(Patient);
Patient.hasMany(Request);
Request.belongsTo(MedicalFacility);
MedicalFacility.hasMany(Request);
Response.belongsTo(Request);
Request.hasOne(Response);
Appeal.belongsTo(User);
User.hasMany(Appeal);
Appeal.belongsTo(Patient);
Patient.hasMany(Appeal);
Appeal.belongsTo(MedicalFacility);
MedicalFacility.hasMany(Appeal);

app.use(errors());

app.use(express.static("public"));

app.listen(port, async () => {
  await sequelize.sync({ alter: true });
  console.log("Server Listening on PORT:", port);
});