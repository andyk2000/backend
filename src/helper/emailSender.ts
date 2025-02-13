import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import ejs from "ejs";
import { logger } from "../../logger";

interface Config {
  email: string;
  password: string;
  secretKey: string;
  frontendLink: string;
}

const config: Config = {
  email: process.env.EMAIL_ADDRESS || "",
  password: process.env.EMAIL_PASSWORD || "",
  secretKey: process.env.SECRET_KEY || "",
  frontendLink: process.env.FRONTEND_LINK || "",
};

const readFileAsync = promisify(fs.readFile);

const emailSender = async (userEmail: string, names: string) => {
  try {
    const imageAttachment = await readFileAsync(
      path.join(__dirname, "../src/views/images/shopping-bag.png"),
      { encoding: "base64" },
    );

    const emailSent = await ejs.renderFile(
      path.join(__dirname, "../views/welcomeEmail.ejs"),
      {
        email: userEmail,
        user_firstname: names,
        confirm_link: config.frontendLink,
      },
    );

    const sender = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.password,
      },
      debug: true,
      logger: true,
    });

    const newMail = {
      from: config.email,
      to: userEmail,
      subject: "Welcome to our online shop",
      html: emailSent,
      attachments: [
        {
          filename: "shopping-bag.png",
          content: imageAttachment,
          encoding: "base64",
          cid: "logo",
        },
      ],
    };

    sender.sendMail(newMail, (error: any, info: { response: any }) => {
      if (error) {
        logger.error("Error sending email:", error);
        throw error;
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    logger.error("email not sent on sign-up", error);
    throw error;
  }
};

const confirmationEmail = async (
  userEmail: string,
  names: string,
  purpose: string,
) => {
  if (purpose === "confirmationEmail") {
    await emailSender(userEmail, names);
  }
};

export { confirmationEmail };
