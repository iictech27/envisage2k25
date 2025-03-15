import validatedEnv from "./validatedEnv.js";

const shouldLog = validatedEnv.LOG;

function log(message: String, sender?: string): void {
    if(!shouldLog) return;
    console.error(message + (sender ? " (from: " + sender + ")" : ""));
}

function logErr(error: Error | String | unknown, sender?: string): void {
    if(!shouldLog) return;

    // Check if error is a valid Error or a String message, otherwise handle it
    let out: Error | String = "Unknown Error";
    if(error instanceof Error || error instanceof String) {
        out = error;
    }

    console.error(out + (sender ? " (from: " + sender + ")" : ""));
}

function logWarn(message: String, sender?: string): void {
    if(!shouldLog) return;
    console.warn(message + (sender ? " (from: " + sender + ")" : ""));
}

export { log, logErr, logWarn };
