import validatedEnv from "./validatedEnv.js";
import { Express } from "express";
import { isHttpError } from "http-errors";
import morgan from "morgan";

const shouldLog = validatedEnv.LOG;

function log(message: String, sender?: string): void {
    if(!shouldLog) return;
    console.log(message + (sender ? " (from: " + sender + ")" : ""));
}

function logErr(error: unknown, sender?: string): void {
    if(!shouldLog) return;

    // Check if error is a valid Error or a String message, otherwise handle it
    let out: unknown = "Unknown Error";
    if(error instanceof Error || error instanceof String || isHttpError(error)) {
        out = error;
    }

    console.error(out + (sender ? " (from: " + sender + ")" : ""));
}

function logWarn(message: String, sender?: string): void {
    if(!shouldLog) return;
    console.warn(message + (sender ? " (from: " + sender + ")" : ""));
}

function startHttpReqLogging(server: Express): void {
    if(!shouldLog) return;
    server.use(morgan("dev"));
}

export { log, logErr, logWarn, startHttpReqLogging };
