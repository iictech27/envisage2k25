import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { httpCodes } from "../../util/httpCodes.js";

export const requireAdmin: RequestHandler = async (req, _res, next) => {
  const adminName = req.body.adminName?.trim();
  const adminPassword = req.body.adminPassword?.trim();

  if(!adminName || !adminPassword || adminName != "admin_envisage" || adminPassword != "@tmsltechies" ) {
    next(createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not an admin!"));
  }

  next();
}
