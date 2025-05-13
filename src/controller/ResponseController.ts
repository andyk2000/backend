import { request, Request, Response } from "express";
import { logger } from "../../logger";
import { createResponse, getResponseById } from "../model/Responses";

const postResponse = async (request: Request, response: Response) => {
  const { requestId, answer, comment, date } = request.body;
  try {
    const responseData = await createResponse({
      requestId,
      answer,
      comment,
      date,
    });
    response.status(200).json({ success: "response created successfully" });
  } catch (error) {
    logger.error("Error creating response", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const getResponse = async (request: Request, response: Response) => {
  const { id } = request.body;
  try {
    const responseData = await getResponseById(id);
    response.status(200).json(responseData);
  } catch (error) {
    logger.error("Error getting response", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

export { postResponse, getResponse };
