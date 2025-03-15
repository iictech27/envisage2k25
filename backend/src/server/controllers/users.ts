import { RequestHandler } from "express";
import UserModel from "../../db/models/user.js";
import httpCodes from "../../util/httpCodes.js";

// endpoint to retrieve users
export const getUsers: RequestHandler = async (_req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(httpCodes["200"].code).json(users);
    } catch(error) {
        next(error);
    }
};

// endpoint to add user
