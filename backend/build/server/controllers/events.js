import httpCodes from "../../util/httpCodes.js";
import { Events } from "../../util/events.js";
export const getEvents = async (_req, res, next) => {
    try {
        const response = {
            status: httpCodes["200"].code,
            message: httpCodes["200"].message,
            events: Events,
            details: "Successfully retrieved events!"
        };
        res.status(response.status);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
