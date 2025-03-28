import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { httpCodes } from "../../util/httpCodes.js";
import { logInfo, logWarn } from "../../util/logger.js";

export const requireAdmin: RequestHandler = async (req, _res, next) => {
  const adminName = req.body.adminName?.trim();
  const adminPassword = req.body.adminPassword?.trim();

  if(!adminName || !adminPassword || adminName != "admin_envisage" || adminPassword != "@tmsltechies" ) {
    logWarn("Non admin user tried to access admin route", "requireAdmin @ middleware/admin.ts");
    next(createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not an admin!"));
  }

  logInfo("User verified as admin! Continuting.", "requireAdmin @ middleware/admin.ts");
  next();
}
