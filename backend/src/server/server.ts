import express, { Request, Response, NextFunction } from "express";

import validatedEnv from "../util/validatedEnv.js";
import { log, logErr } from "../util/logger.js";
import { log, logErr, startHttpReqLogging } from "../util/logger.js";
import usersRouter from "./routes/users.js";
import rootRouter from "./routes/root.js";
import httpCodes from "../util/httpCodes.js";
import createHttpError, { isHttpError } from "http-errors";

const server = express();
const port = validatedEnv.PORT;

function startServer() : void {

    // listen to requests
    server.listen(port, () => {
        log("Listening at port " + port);
    });

    // log http requests
    startHttpReqLogging(server);

    // parse json body
    server.use(express.json());

    // catch favicon.ico requests which are sent by some browsers
    server.get("/favicon.ico", (_req: Request, res: Response) => {
        res.status(httpCodes["204"].code);
    });

    // different routes/endpoints
    server.use("/", rootRouter);
    server.use("/api/", usersRouter);


    // non-existent endpoint handler
    server.use((_req: Request, _res: Response, next: NextFunction) => {
        next(Error("Endpoint not found."));
        next(createHttpError(httpCodes["404"].code, httpCodes["404"].message + ": Endpoint not found."));
    });


    // NOTE : keep error handling endpoint last
    // error handling
    server.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
        logErr(error, "server.ts");

        if(isHttpError(error)) {
            res.status(error.statusCode);
            res.send(error.message);
            return;
        }
        res.status(httpCodes["500"].code);
        res.send(error instanceof Error ? error.message : "Unknown Error");
    });

}

export default server;
export { startServer };
