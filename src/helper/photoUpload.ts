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
): Promise<string[]> => {
  const result: string[] = [];

  // Use Promise.all to handle asynchronous uploads
  await Promise.all(
    attachment.map(async (logo: string) => {
      const base64Data = logo.split(";base64,").pop();
      if (base64Data) {
        cloudinary.config({
          ...config,
          timeout: 60000, // Set timeout to 60 seconds
        });
        try {
          const uploadResult: UploadApiResponse = await new Promise(
            (resolve, reject) => {
              cloudinary.uploader
                .upload_stream((error, uploadResult) => {
                  if (error) {
                    return reject(error); // Handle errors properly
                  }
                  if (uploadResult) {
                    return resolve(uploadResult);
                  }
                })
                .end(Buffer.from(base64Data, "base64"));
            },
          );
          console.log("uploadResult:", uploadResult.secure_url);
          await createResource({
            requestId: requestId,
            resourcePath: uploadResult.secure_url,
          });
          result.push(uploadResult.secure_url);
        } catch (error) {
          logger.error("Error uploading to Cloudinary:", error);
        }
      }
    }),
  );

  console.log("result:", result);
  return result; // Return the result array
};

export { uploadimage };
