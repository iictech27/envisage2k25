import os from "node:os";
import winston from "winston";
import { Syslog } from "winston-syslog";
import morgan from "morgan";
import { Express } from "express";

import validatedEnv from "./validatedEnv.js";

const shouldLog = validatedEnv.LOG;
const shouldLogHttpRequests = validatedEnv.LOG_LEVEL;
const logTo = validatedEnv.LOG_TO;

// WARN : Has to conform to syslog levels
const LogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

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
      format: "DD-MM-YYYY HH:mm:ss.SSS",
    }),
    winston.format.align(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  eol: "\n",
});

// creating logger with the transports
const logger = winston.createLogger({
  levels: LogLevels,
  level: validatedEnv.LOG_LEVEL,
  transports:
    logTo == "papertrail"
      ? [papertrail]
      : logTo == "console"
        ? [console]
        : [papertrail, console],
});

export function startHttpReqLogging(server: Express): void {
  if (!shouldLog) return;
  if (!shouldLogHttpRequests) return;

  server.use(
    morgan("dev", {
      stream: {
        write: (message) => logger.debug("[Morgan] " + message.trim()),
      },
    })
  );
}

export function logInfo(message: string, sender?: string): void {
  if (!shouldLog) return;

  logger.info(message + (sender ? " (from: " + sender + ")" : ""));
}

export function logDebug(message: string, obj: unknown, sender?: string): void {
  if (!shouldLog) return;

  logger.debug(message + (sender ? " (from: " + sender + ")" : ""));
  if (obj != null && obj != undefined && Object.keys(obj).length)
    logger.debug("More info:\n" + JSON.stringify(obj, null, 2));
}

export function logErr(error: unknown, sender?: string): void {
  if (!shouldLog) return;

  if (error instanceof String) {
    logger.error(error + (sender ? " (from: " + sender + ")" : ""));
    return;
  } else {
    logger.error("An error occurred" + (sender ? " at " + sender : ""));
    if (error != null && error != undefined && Object.keys(error).length > 0)
      logger.error(
        "More info:\n" +
          (error instanceof Object ? JSON.stringify(error, null, 2) : error)
      );
    return;
  }
}

export function logWarn(message: string, sender?: string): void {
  if (!shouldLog) return;
  logger.warn(message + (sender ? " (from: " + sender + ")" : ""));
}
