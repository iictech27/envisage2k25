/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Express } from "express";
import { isHttpError } from "http-errors";
import morgan from "morgan";

import validatedEnv from "./validatedEnv.js";

const shouldLog = validatedEnv.LOG;

export function log(message: String, sender?: string): void {
  if (!shouldLog) return;
  console.log(message + (sender ? " (from: " + sender + ")" : ""));
}

export function logErr(error: unknown, sender?: string): void {
  if (!shouldLog) return;

  // Check if error is a valid Error or a String message, otherwise handle it
  let out: unknown = "Unknown Error";
  if (error instanceof Error || error instanceof String || isHttpError(error)) {
    out = error;
  }

  console.error(out + (sender ? " (from: " + sender + ")" : ""));
}

export function logWarn(message: String, sender?: string): void {
  if (!shouldLog) return;
  console.warn(message + (sender ? " (from: " + sender + ")" : ""));
}

export function startHttpReqLogging(server: Express): void {
  if (!shouldLog) return;
  server.use(morgan("dev"));
}
