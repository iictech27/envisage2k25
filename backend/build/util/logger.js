import { isHttpError } from "http-errors";
import morgan from "morgan";
import validatedEnv from "./validatedEnv.js";
const shouldLog = validatedEnv.LOG;
export function log(message, sender) {
    if (!shouldLog)
        return;
    console.log(message + (sender ? " (from: " + sender + ")" : ""));
}
export function logErr(error, sender) {
    if (!shouldLog)
        return;
    // Check if error is a valid Error or a String message, otherwise handle it
    let out = "Unknown Error";
    if (error instanceof Error || error instanceof String || isHttpError(error)) {
        out = error;
    }
    console.error(out + (sender ? " (from: " + sender + ")" : ""));
}
export function logWarn(message, sender) {
    if (!shouldLog)
        return;
    console.warn(message + (sender ? " (from: " + sender + ")" : ""));
}
export function startHttpReqLogging(server) {
    if (!shouldLog)
        return;
    server.use(morgan("dev"));
}
