import { RequestHandler } from "express";

import { Events } from "../../util/events.js";
import { httpCodes } from "../../util/httpCodes.js";
import { ResEventsBody } from "../bodies/events.js";

export const getEvents: RequestHandler = async(_req, res, next) => {
    try {

        const response: ResEventsBody = {
            status: httpCodes["200"].code,
            message: httpCodes["200"].message,
            events: Events,
            details: "Successfully retrieved events!"
        }

        res.status(response.status);
        res.json(response);

    } catch(error) {
        next(error);
    }
}
