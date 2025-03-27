import createHttpError from "http-errors";
import { httpCodes } from "../../util/httpCodes.js";
import UserModel from "../../db/models/user.js";
// import UnverifiedUserModel from "../../db/models/unverified_user.js";
// middleware for requests which require the user to be authenticated (eg registration, profile view)
export const requireAuthUser = async (req, _res, next) => {
    const sessionToken = req.session.sessionToken;
    // if session token does not exist then user is not authenticated
    if (!sessionToken) {
        next(createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!"));
    }
    // if session token exists but there is no user with userID given in the token then user is not authenticated
    if (!await UserModel.findById(sessionToken).exec()) {
        next(createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!"));
    }
    next();
};
// middleware for requests which require the user to not be authenticated (eg login, signup)
export const requireUnauthUser = async (req, _res, next) => {
    const sessionToken = req.session.sessionToken;
    console.log(req.session);
    // if session token exists and there is a user with userID given in the token then user is authenticated
    if (sessionToken && await UserModel.findById(sessionToken).exec()) {
        next(createHttpError(httpCodes["403"].code, httpCodes["403"].message + ": User already authenticated!"));
    }
    next();
};
