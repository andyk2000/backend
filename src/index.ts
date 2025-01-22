import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import fileUpload from "express-fileupload";
import express, { Express } from "express";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { Appeal, initializeAppeal } from "./model/Appeals";
import { Bill, initializeBill } from "./model/Bills";
import {
  initializeMedicalFacility,
  MedicalFacility,
} from "./model/MedicalFacilities";
import { initializePatient, Patient } from "./model/Patients";
import { initializeRequest, Request } from "./model/Requests";
import { initializeResponse, Response } from "./model/Responses";
import { initializeUser, User } from "./model/Users";
import { errors } from "celebrate";
import { userRouter } from "./routes/userRoutes";

const app: Express = express();
const port = process.env.PORT;

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
  frontend: process.env.FRONTEND_LINK || "",
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
  logging: false,
});

initializeUser(sequelize);
initializeBill(sequelize);
initializeMedicalFacility(sequelize);
initializePatient(sequelize);
initializeRequest(sequelize);
initializeResponse(sequelize);
initializeAppeal(sequelize);

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
Appeal.belongsTo(Response);
Response.hasMany(Appeal);

app.use("/home", userRouter);

app.use(errors());

app.listen(port, async () => {
  await sequelize.sync({ alter: true });
  console.log("Server Listening on PORT:", port);
});
