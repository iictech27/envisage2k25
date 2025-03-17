import validatedEnv from "./validatedEnv.js";
import { isHttpError } from "http-errors";
import morgan from "morgan";
const shouldLog = validatedEnv.LOG;
function log(message, sender) {
    if (!shouldLog)
        return;
    console.log(message + (sender ? " (from: " + sender + ")" : ""));
}
function logErr(error, sender) {
    if (!shouldLog)
        return;
    // Check if error is a valid Error or a String message, otherwise handle it
    let out = "Unknown Error";
    if (error instanceof Error || error instanceof String || isHttpError(error)) {
        out = error;
    }
    console.error(out + (sender ? " (from: " + sender + ")" : ""));
}
function logWarn(message, sender) {
    if (!shouldLog)
        return;
    console.warn(message + (sender ? " (from: " + sender + ")" : ""));
}
function startHttpReqLogging(server) {
    if (!shouldLog)
        return;
    server.use(morgan("dev"));
}
export { log, logErr, logWarn, startHttpReqLogging };
