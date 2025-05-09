import { createPatient } from "../model/Patients";
import { request, Request, Response } from "express";
import { logger } from "../../logger";
import {
  createRequest,
  getRequestByDoctor,
  getRequestById,
  getRequestByMDF,
  getRequestByPatient,
  updateRequestStatus,
} from "../model/Requests";
import { uploadimage } from "../helper/photoUpload";
import { getPatientIdentification } from "../helper/patientIdentification";

const status: { [key: number]: string } = {
  1: "Initiated",
  2: "On-going",
  3: "Accepted",
  4: "Rejected",
  5: "Appeal",
  6: "Reopened",
};

const priority: { [key: number]: string } = {
  1: "High",
  2: "Medium",
  3: "Low",
};

const registerRequest = async (request: Request, response: Response) => {
  const {
    patientId,
    medicalfacilityId,
    title,
    description,
    attachments,
    status,
    doctorId,
  } = request.body;
  let resources = false;
  if (attachments) {
    resources = true;
  }
  // console.log("attachments:", attachments);
  console.log("resources:", resources);
  console.log("status:", status);
  console.log("doctorId:", doctorId);
  console.log("medicalfacilityId:", medicalfacilityId);
  console.log("title:", title);
  console.log("patientId:", patientId);
  console.log("description:", description);
  try {
    const patientIdentification = await getPatientIdentification(patientId);
    console.log("patientIdentification:", patientIdentification);
    if (patientIdentification) {
      const clientRequest = await createRequest({
        medicalFacilityId: 6,
        title,
        patientId: patientIdentification.id,
        description,
        resources,
        status,
        doctorId: doctorId,
        priority: 1,
        mdaId: 1,
      });
      const resourcesUpload = await uploadimage(attachments, clientRequest.id);
      response.status(200).json(clientRequest);
    } else {
      response.status(404).json({
        error: "Patient not found",
      });
    }
  } catch (error) {
    logger.error("Error creating a new request:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRequestDoctor = async (request: Request, response: Response) => {
  const { id } = request.body;

  try {
    const requestData = await getRequestByDoctor(id);

    const formattedData = requestData.map((rqst) => ({
      ...rqst.toJSON(),
      priority: priority[rqst.priority],
      status: status[rqst.status],
    }));

    response.status(200).json(formattedData);
  } catch (error) {
    logger.error("Error getting request by doctor ID:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRequestPatient = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const requestData = await getRequestByPatient(id);
    response.status(200).json(requestData);
  } catch (error) {
    logger.error("Error getting request by patient ID:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRequestMDF = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const requestData = await getRequestByMDF(id);
    response.status(200).json(requestData);
  } catch (error) {
    logger.error("Error getting request by medical facility ID:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRequestID = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const requestData = await getRequestById(id);
    response.status(200).json(requestData);
  } catch (error) {
    logger.error("Error getting request by patient ID:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const changeStatus = async (request: Request, response: Response) => {
  const { id, status } = request.body;
  try {
    const requestupdated = await updateRequestStatus(id, status);
    response.status(200).json(requestupdated);
  } catch (error) {
    logger.error("Error updating request status", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

export {
  registerRequest,
  changeStatus,
  getRequestID,
  getRequestMDF,
  getRequestPatient,
  getRequestDoctor,
};
