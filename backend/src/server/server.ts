/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import rateLimit from "express-rate-limit";

import { mongoStore } from "../db/db.js";
import { httpCodes } from "../util/httpCodes.js";
import validatedEnv from "../util/validatedEnv.js";
import { logInfo, logErr, startHttpReqLogging, logWarn, logDebug } from "../util/logger.js";
import rootRouter from "./routes/root.js";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import registrationRouter from "./routes/registration.js";
import { ResErrorBody } from "./bodies/errors.js";
import adminRouter from "./routes/admin.js";

const server = express();
const port = validatedEnv.PORT;
const sessionSecret = validatedEnv.SESSION_SECRET;
const sessionTimeLimitMs = validatedEnv.SESSION_EXP_MIN_M * 60 * 1000;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  handler: (req, res) => {
    logWarn(`${req.ip} exhausted rate limit.`, "apiLimiter @ server.ts");    
    res.status(429).send({ message: "Too many requests, try again later." });
  },
});

function startServer(): void {
  // listen to requests

  server.listen(port, () => {
    logInfo("------------------------------------------------------------------------------------------");
    logInfo("Listening at port " + port);
  });

  // cors middleware
  const allowedOrigins = [process.env.CLIENT_LINK];

  server.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          logWarn(`${origin} blocked by CORS`, "cors @ server.ts");
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      optionsSuccessStatus: 200, // Legacy browser support
    })
  );

  // Preflight requests
  server.options("*", cors());

  // log http requests
  startHttpReqLogging(server);

  // parse json body
  server.use(express.json());

  // parse form submissions encoded in url
  server.use(
    express.urlencoded({
      extended: true, // allows parsing of nested objects and arrays
      limit: "1mb", // restrict max size of request body to 1mb for security
      parameterLimit: 100, // limit number of form fields to 100 to prevent DoS attacks
    })
  );

  // setup session management
  // NOTE : should be called after setting up json parsing and before declaring routes
  server.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: sessionTimeLimitMs },
      rolling: true,
      store: mongoStore,
    })
  );

  // catch favicon.ico requests which are sent by some browsers
  server.get("/favicon.ico", (_req: Request, res: Response) => {
    res.status(httpCodes["204"].code);
  });

  // different routes/endpoints
  server.use("/", rootRouter);
  server.use("/api", rootRouter);
  server.use("/api", apiLimiter, usersRouter);
  server.use("/api", apiLimiter, registrationRouter);
  server.use("/api", eventsRouter);
  server.use("/api", adminRouter);

  // non-existent endpoint handler
  server.use((_req: Request, _res: Response, next: NextFunction) => {
    logWarn("Tried to access a non-existent endpoint!", "endpoint handler @ server.ts");
    next(
      createHttpError(
        httpCodes["404"].code,
        httpCodes["404"].message + ": Endpoint not found."
      )
    );
  });

  // NOTE : keep error handling endpoint last
  // error handling
  server.use(
    (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
      // default error
      let errorResponse: ResErrorBody = {
        code: httpCodes["500"].code,
        error:
          "[" +
          httpCodes["500"].code +
          "] " +
          httpCodes["500"].message +
          ": An unknown error has occured!",
      };

      // parse errors
      if (isHttpError(error)) {
        errorResponse.code = error.statusCode;
        errorResponse.error = "[" + error.statusCode + "] " + error.message;
      } else {
        logErr(error, "error handler @ server.ts");
      }

      res.status(errorResponse.code);
      res.json(errorResponse);
    }
  );
}

export default startServer;
