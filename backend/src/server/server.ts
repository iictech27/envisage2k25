import express, { Request, Response, NextFunction } from "express";

import validatedEnv from "../util/validatedEnv.js";
import { log, logErr } from "../util/logger.js";
import usersRouter from "./routes/users.js";
import rootRouter from "./routes/root.js";
import httpCodes from "../util/httpCodes.js";

const server = express();
const port = validatedEnv.PORT;

function startServer() : void {

    // listen to requests
    server.listen(port, () => {
        log("Listening at port " + port);
    });


    // parse json body
    server.use(express.json());


    // different routes/endpoints
    server.use("/", rootRouter);
    server.use("/api/", usersRouter);


    // non-existent endpoint handler
    server.use((_req: Request, _res: Response, next: NextFunction) => {
        next(Error("Endpoint not found."));
    });


    // NOTE : keep error handling endpoint last
    // error handling
    server.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
        logErr(error, "server.ts");
        res.status(httpCodes["500"].code);
        res.send(error instanceof Error ? error.message : "Unknown Error");
    });

}

export default server;
export { startServer };
