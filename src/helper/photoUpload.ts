import slugify from "slugify";
import { logger } from "../../logger";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { createResource } from "../model/Resources";

interface Config {
  api_secret: string;
  cloud_name: string;
  api_key: string;
}

const config: Config = {
  api_secret: process.env.CLOUDINARY_SECRET_KEY || "",
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
};

const frontend_link = process.env.FRONTEND_LINK || "";

const uploadimage = async (
  attachment: string[],
  requestId: number,
  parent: string
): Promise<string[]> => {
  const result: string[] = [];

  // Use Promise.all to handle asynchronous uploads
  await Promise.all(
    attachment.map(async (logo: string) => {
      const base64Data = logo.split(";base64,").pop();
      if (base64Data) {
        cloudinary.config({
          ...config,
          timeout: 120000, // Increase timeout to 120 seconds
        });
        try {
          const uploadResult: UploadApiResponse = await new Promise(
            (resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  timeout: 120000, // Also set timeout in upload options
                  resource_type: "auto",
                },
                (error, uploadResult) => {
                  if (error) {
                    logger.error("Cloudinary upload error:", error);
                    return reject(error);
                  }
                  if (uploadResult) {
                    return resolve(uploadResult);
                  }
                  return reject(new Error("Upload failed - no result"));
                }
              );
              
              uploadStream.end(Buffer.from(base64Data, "base64"));
            },
          );
          
          console.log("uploadResult:", uploadResult.secure_url);
          await createResource({
            requestId: requestId,
            resourcePath: uploadResult.secure_url,
            parent: parent,
          });
          result.push(uploadResult.secure_url);
        } catch (error) {
          logger.error("Error uploading to Cloudinary:", error);
          // Don't throw, just log and continue with other uploads
        }
      }
    }),
  );

  console.log("result:", result);
  return result;
};

export { uploadimage };
