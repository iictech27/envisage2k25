import { RequestHandler } from "express";

// root "/" get endpoint
export const getServerStatus: RequestHandler = (_req, res, next) => {
    try {
        res.send("Server is Running!");
    } catch(error) {
        next(error);
    }
};
