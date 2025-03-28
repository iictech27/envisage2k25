/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { isHttpError } from "http-errors";
import os from "node:os";
import winston from "winston";
import { Syslog } from "winston-syslog";
import morgan from "morgan";
import { Express } from "express";

import validatedEnv from "./validatedEnv.js";

const shouldLog = validatedEnv.LOG;
const shouldLogHttpRequests = validatedEnv.LOG_REQS;

// transport for logging to papertrail
const papertrail = new Syslog({
  host: validatedEnv.PPTRL_HOST,
  port: validatedEnv.PPTRL_PORT,
  protocol: validatedEnv.PPTRL_PROTOCOL,
  localhost: os.hostname(),
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.align(),
    winston.format.printf((info) => `${info.level}: ${info.message}`)
  ),
  eol: "\n",
});

// transport for loggin to console
const console = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss.SSS',
    }),
    winston.format.align(),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  eol: "\n",
});

export function startHttpReqLogging(server: Express): void {
  if (!shouldLog) return;
  if(!shouldLogHttpRequests) return;

  server.use(morgan("dev", {
    stream: {
      write: (message) => logger.info("[Morgan] " + message.trim())
    }
  }));
}

// creating logger with the transports
const logger = winston.createLogger({
  transports: [papertrail, console],
});

export function logInfo(message: String, sender?: string): void {
  if (!shouldLog) return;

  logger.info(message + (sender ? " (from: " + sender + ")" : ""));
}

export function logDebug(message: unknown, sender?: string): void {
  if (!shouldLog) return;

  logger.debug(message + (sender ? " (from: " + sender + ")" : ""));
}

export function logErr(error: unknown, sender?: string): void {
  if (!shouldLog) return;

  // Check if error is a valid Error or a String message, otherwise handle it
  let out: unknown = "Unknown Error";
  if (error instanceof Error) {
    out = "[" +  error.name + "] " + error.message;
  }
  if (isHttpError(error)) {
    out = "[" + error.statusCode + " " + error.name + "]" + " " + error.message;
  }
  if (error instanceof String) {
    out = error;
  }

  logger.error(out + (sender ? " (from: " + sender + ")" : ""));
}

export function logWarn(message: String, sender?: string): void {
  if (!shouldLog) return;
  logger.warn(message + (sender ? " (from: " + sender + ")" : ""));
}
