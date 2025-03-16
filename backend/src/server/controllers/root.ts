import { RequestHandler } from "express";
import createHttpError from "http-errors";
import httpCodes from "../../util/httpCodes.js";

// root "/" get endpoint
export const getServerStatus: RequestHandler = (_req, res, next) => {
    try {
        res.send(httpCodes["200"].code);
        res.send("Server is Running!");
    } catch(error) {
        next(createHttpError(httpCodes["503"].code, httpCodes["503"].message + ": Server Down!"));
    }
};
