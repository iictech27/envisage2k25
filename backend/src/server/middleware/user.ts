import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { httpCodes } from "../../util/httpCodes.js";
import UserModel from "../../db/models/user.js";
import { logDebug, logInfo, logWarn } from "../../util/logger.js";
// import UnverifiedUserModel from "../../db/models/unverified_user.js";

// middleware for requests which require the user to be authenticated (eg registration, profile view)
export const requireAuthUser: RequestHandler = async (req, _res, next) => {
  const sessionToken = req.session.sessionToken;

  logDebug("Session: ", req.session, "requireAuthUser @ middleware/user.ts");

  // if session token does not exist then user is not authenticated
  if (!sessionToken) {
    logWarn("Unauthenticated user (without session token) tries to access route requiring auth.", "requireAuthUser @ middleware/user.ts");
    next(
      createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": User not authenticated!"
      )
    );
  }

  // if session token exists but there is no user with userID given in the token then user is not authenticated
  else if (!(await UserModel.findById(sessionToken).exec())) {
    logWarn("Unauthenticated user (with invalid session token) tries to access route requiring auth.", "requireAuthUser @ middleware/user.ts");
    next(
      createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": User not authenticated!"
      )
    );
  }

  else {
    logInfo("User is authenticated! Continuing.", "requireAuthUser @ middleware/user.ts");
  }

  next();
};

// middleware for requests which require the user to not be authenticated (eg login, signup)
export const requireUnauthUser: RequestHandler = async (req, _res, next) => {
  const sessionToken = req.session.sessionToken;

  logDebug("Session: ", req.session.sessionToken, "requireUnauthUser @ middleware/user.ts");


  if (await UserModel.findById(sessionToken).exec()) {
    logWarn(`Authenticated user (with${sessionToken ? "" : " no"} session token) tries to access route requiring auth.`, "requireUnuthUser @ middleware/user.ts");
    next(
      createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message + ": User already authenticated!"
      )
    );
  } else {
    logInfo("User is unauthenticated! Continuing.", "requireUnuthUser @ middleware/user.ts");
  }

  next();
};
