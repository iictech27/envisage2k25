import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";

import { mongoStore } from "../db/db.js";
import { httpCodes } from "../util/httpCodes.js";
import validatedEnv from "../util/validatedEnv.js";
import { log, logErr, startHttpReqLogging } from "../util/logger.js";
import rootRouter from "./routes/root.js";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import registrationRouter from "./routes/registration.js";
import { ResErrorBody } from "./bodies/errors.js";

const server = express();
const port = validatedEnv.PORT;
const sessionSecret = validatedEnv.SESSION_SECRET;
const sessionTimeLimitMs = validatedEnv.SESSION_EXP_MIN_M * 60 * 1000;

function startServer() : void {

    // listen to requests
    server.listen(port, () => {
        log("Listening at port " + port);
    });

    // cors middleware
    server.use(cors({
        origin: validatedEnv.CLIENT_LINK,
        credentials: true,
    }));

    // log http requests
    startHttpReqLogging(server);

    // parse json body
    server.use(express.json());

    // parse form submissions encoded in url
    server.use(express.urlencoded({
        extended: true, // allows parsing of nested objects and arrays
        limit: "1mb", // restrict max size of request body to 1mb for security
        parameterLimit: 100, // limit number of form fields to 100 to prevent DoS attacks
    }));

    // setup session management
    // NOTE : should be called after setting up json parsing and before declaring routes
    server.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: sessionTimeLimitMs, },
        rolling: true,
        store: mongoStore
    }));

    // catch favicon.ico requests which are sent by some browsers
    server.get("/favicon.ico", (_req: Request, res: Response) => {
        res.status(httpCodes["204"].code);
    });

    // different routes/endpoints
    server.use("/", rootRouter);
    server.use("/api", rootRouter);
    server.use("/api", usersRouter);
    // server.use("/api", registrationRouter);
    server.use("/api", eventsRouter);

    // non-existent endpoint handler
    server.use((_req: Request, _res: Response, next: NextFunction) => {
        next(createHttpError(httpCodes["404"].code, httpCodes["404"].message + ": Endpoint not found."));
    });

    // NOTE : keep error handling endpoint last
    // error handling
    server.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
        logErr(error);

        // default error
        let errorResponse: ResErrorBody = {
            code: httpCodes["500"].code,
            error: "[" + httpCodes["500"].code + "] " + httpCodes["500"].message + ": An unknown error has occured!",
        }

        // parse errors
        if(isHttpError(error)) {
            errorResponse.code = error.statusCode;
            errorResponse.error = "[" + error.statusCode + "] " + error.message;
        }

        res.status(errorResponse.code);
        res.json(errorResponse);
    });

}

export default startServer;
