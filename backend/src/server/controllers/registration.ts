import { RequestHandler } from "express";
import RegistrationModel from "../../db/models/registration.js";
import httpCodes from "../../util/httpCodes.js";

// endpoint to retrieve regsitrations
export const getRegistrations: RequestHandler = async (_req, res, next) => {
    try {
        const registrations = await RegistrationModel.find().exec();
        res.status(httpCodes["200"].code).json(registrations);
    } catch(error) {
        next(error);
    }
};

// TODO : endpoint to retrieve particular registration

// TODO : endpoint to add registration
