/* eslint-disable prettier/prettier */
import winston, { format } from "winston";

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 10485760,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
  format.align(),
  format.printf(
    (info) =>
      `{"timestamp": "${info.timestamp}", "level": "${info.level}", "message": "${info.message}"}`
  ),
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
  format.align(),
  format.printf(
    (info) =>
      `{"timestamp": "${info.timestamp}", "level": "${info.level}", "message": "${info.message}"}`
  ),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels: logLevels,
  format: format.combine(),
  transports: [
    new winston.transports.File({ ...options.file, format: fileFormat }),
    new winston.transports.Console({ ...options.console, format: consoleFormat }),
  ],
  exitOnError: false,
  exceptionHandlers: [
    new winston.transports.File({ filename: "./logs/exception.log", format: fileFormat }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "./logs/rejections.log", format: fileFormat }),
  ],
});

export { logger };
