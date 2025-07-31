import { createPatient, Patient } from "../model/Patients";
import { Request as ExpressRequest, Response } from "express";
import { logger } from "../../logger";
import {
  changeRequestStatus,
  createRequest,
  getAllRequest,
  getRequestByDoctor,
  getRequestById,
  getRequestByMDF,
  getRequestByPatient,
  getRequestWithAppeal,
  updateRequestStatus,
} from "../model/Requests";
import { uploadimage } from "../helper/photoUpload";
import { getPatientIdentification } from "../helper/patientIdentification";
import { getMdfinfo, User } from "../model/Users";
import { gerateResponse } from "../model/Responses";
import { getResourceByRequest, Resource } from "../model/Resources";
import { MedicalFacility } from "../model/MedicalFacilities";
import { Appeal } from "../model/Appeals";

const status: { [key: number]: string } = {
  1: "Initiated",
  2: "On-going",
  3: "Accepted",
  4: "Rejected",
  5: "Appeal",
  6: "Reopened",
};

const priority: { [key: number]: string } = {
  0: "Urgent",
  1: "High",
  2: "Medium",
  3: "Low",
};

const registerRequest = async (
  request: ExpressRequest,
  response: Response,
): Promise<void> => {
  const {
    doctorId,
    medicalFacilityId,
    title,
    patientId,
    description,
    resources,
    status,
    mdaId,
  } = request.body;

  try {
    const patientIdentification = await getPatientIdentification(patientId);
    if (!patientIdentification) {
      response.status(404).json({
        success: false,
        message: "Patient not found",
      });
      return;
    }

    let isResources = false;
    if (resources) {
      isResources = true;
    }

    const clientRequest = await createRequest({
      medicalFacilityId: medicalFacilityId,
      title,
      patientId: patientIdentification.id,
      description,
      resources: isResources,
      status,
      doctorId: doctorId,
      priority: 1,
      mdaId: 2,
    });
    if (resources) {
      // Convert single base64 string to array
      const resourcePath = await uploadimage(
        [resources],
        clientRequest.id,
        "request",
      );
      console.log(resourcePath);
    }

    response.status(201).json({
      success: true,
      message: "Request created successfully",
      data: clientRequest,
    });
  } catch (error) {
    logger.error("Error creating request", error);
    response.status(500).json({
      success: false,
      message: "Failed to create request",
    });
  }
};

const getRequestDoctor = async (request: ExpressRequest, response: Response) => {
  const { id } = request.body;
  try {
    const requests = await getRequestByDoctor(parseInt(id));
    response.status(200).json(requests);
  } catch (error) {
    logger.error("Error retrieving requests by doctor", error);
    response.status(500).json({
      success: false,
      message: "Failed to retrieve requests",
    });
  }
};

const getRequestPatient = async (request: ExpressRequest, response: Response) => {
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

const getRequestMDF = async (request: ExpressRequest, response: Response) => {
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

const getRequestID = async (
  request: ExpressRequest,
  response: Response,
): Promise<void> => {
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

const changeStatus = async (request: ExpressRequest, response: Response) => {
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

const getAllRequests = async (request: ExpressRequest, response: Response) => {
  try {
    const requestData = await getAllRequest();
    response.status(200).json(requestData);
  } catch (error) {
    logger.error("Error getting all requests:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const requestResponse = async (request: ExpressRequest, response: Response) => {
  const { id, resp, comment } = request.body;
  try {
    if (resp == 1) {
      const newstatus = 3;
      const requestData = await changeRequestStatus(id, newstatus);
      console.log(requestData);
      const generateresponse = await gerateResponse(id, "Success", comment);
      response.status(200).json(generateresponse);
    } else if (resp == 2) {
      const newstatus = 4;
      const requestData = await changeRequestStatus(id, newstatus);
      const generateresponse = await gerateResponse(id, "Failed", comment);
      response.status(200).json(generateresponse);
    } else if (resp == 3) {
      const newstatus = 5;
      const requestData = await changeRequestStatus(id, newstatus);
      const generateresponse = await gerateResponse(id, "Pending", comment);
      response.status(200).json(generateresponse);
    }
  } catch (error) {
    logger.error("Error getting request by ID:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRequestAppeal = async (request: ExpressRequest, response: Response) => {
  const { id } = request.body;
  try {
    const requestData = await getRequestWithAppeal(id);

    if (!requestData) {
      response.status(404).json({
        error: "Request not found",
      });
      return;
    }

    const appeal = requestData.response?.appeal;

    if (requestData.resources && appeal && !appeal.additionalresources) {
      const resources = await getResourceByRequest(id, "request");
      response.status(200).json({ requestData, resources });
      return;
    }

    if (requestData.resources && appeal && appeal.additionalresources) {
      const requestResources = await getResourceByRequest(id, "request");
      const appealResources = await getResourceByRequest(id, "appeal");
      response.status(200).json({
        requestData,
        resources: { request: requestResources, appeal: appealResources },
      });
      return;
    }

    if (!requestData.resources && appeal && appeal.additionalresources) {
      const resources = await getResourceByRequest(id, "appeal");
      response.status(200).json({ requestData, resources });
      return;
    }

    response.status(200).json({ requestData });
  } catch (error) {
    logger.error("Error getting request by ID:", error);
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
  getAllRequests,
  requestResponse,
  getRequestAppeal,
};






