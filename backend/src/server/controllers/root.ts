/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { httpCodes } from "../../util/httpCodes.js";
import { logErr, logInfo } from "../../util/logger.js";

// root "/" get endpoint
export const getServerStatus: RequestHandler = (_req, res, next) => {
  try {
    logInfo("Server status requested. Up nd Running.", "getServerStatus @ controllers/root.ts");
    res.status(httpCodes["200"].code);
    res.send("Server is Running!");
  } catch (error) {
    logErr(error, "getServerStatus @ controllers/root.ts");
    next(
      createHttpError(
        httpCodes["503"].code,
        httpCodes["503"].message + ": Server Down!"
      )
    );
  }
};
