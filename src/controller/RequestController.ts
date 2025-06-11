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

const registerRequest = async (request: Request, response: Response): Promise<void> => {
  const {
    doctorId,
    medicalfacilityId,
    title,
    patientId,
    description,
    resources,
    status,
    date,
  } = request.body;
  
  try {
    const patientIdentification = await getPatientIdentification(patientId);
    if (!patientIdentification) {
      response.status(404).json({
        success: false,
        message: "Patient not found"
      });
      return;
    }
    
    const clientRequest = await createRequest({
      medicalFacilityId: medicalfacilityId,
      title,
      patientId: patientIdentification.id,
      description,
      resources,
      status,
      doctorId: doctorId,
      priority: 1,
      mdaId: 1,
    });
    
    response.status(201).json({
      success: true,
      message: "Request created successfully",
      data: clientRequest
    });
  } catch (error) {
    logger.error("Error creating request", error);
    response.status(500).json({
      success: false,
      message: "Failed to create request"
    });
  }
};

const getRequestDoctor = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const requests = await getRequestByDoctor(id);
    response.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    logger.error("Error retrieving requests by doctor", error);
    response.status(500).json({
      success: false,
      message: "Failed to retrieve requests"
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

const getRequestID = async (request: Request, response: Response): Promise<void> => {
  const { id } = request.body;
  try {
    const requestData = await getRequestById(id);
    response.status(200).json(requestData);
  } catch (error) {
    logger.error("Error getting request by ID:", error);
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


