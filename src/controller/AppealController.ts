import { Request, Response } from "express";
import { logger } from "../../logger";
import { createAppeal, responseAppeal } from "../model/Appeals";
import { uploadimage } from "../helper/photoUpload";
import { changeRequestStatus } from "../model/Requests";

const postAppeal = async (request: Request, response: Response) => {
  const { responseId, argument, resources, status } = request.body;
  let additionalresources = false;
  if (resources) {
    additionalresources = true;
  }
  try {
    const appealData = await createAppeal({
      responseId,
      argument,
      additionalresources,
      status,
      appealDecisionArgument: ""
    });

    if (resources) {
      const resourcePath = await uploadimage(
        resources,
        appealData.id,
        "appeal",
      );
      console.log(resourcePath);
    }
    const newstatus = 6;
    const requestData = await changeRequestStatus(responseId, newstatus);
    response.status(200).json({ success: "appeal created successfully" });
  } catch (error) {
    logger.error("Error creating appeal", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

const responseToAppeal = async (request: Request, response: Response) => {
  const { id, decision, status } = request.body;
  try {
    const appealData = await responseAppeal(id, decision, status);
    response.status(200).json({ success: "appeal responded successfully" });
  } catch (error) {
    logger.error("Error responding to appeal", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
};

export { postAppeal, responseToAppeal };
