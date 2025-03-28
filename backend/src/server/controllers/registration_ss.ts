import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { Events } from "../../util/events.js";
import UserModel from "../../db/models/user.js";
import { httpCodes } from "../../util/httpCodes.js";
import {
  ReqSSRegistrationOrderBody,
  ResSSRegistrationBody,
} from "../bodies/registration_ss.js";
import SSRegistrationModel from "../../db/models/registration_ss.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import transport from "../services/nodemailer.js";
import mailOptions from "../mails/reg_requested.js";
import { logDebug, logWarn, logErr, logInfo } from "../../util/logger.js";
import { sendMail } from "../services/email_handler.js";

export const createRegistration: RequestHandler<
  unknown,
  unknown,
  ReqSSRegistrationOrderBody,
  unknown
> = async (req, res, next) => {

  logDebug("Create Registration Body:", req.body, "createRegistration @ controllers/registration.ts");

  const fullname = req.body.fullname?.trim();
  const email = req.body.email?.trim();
  // const department = req.body.department?.trim();
  const year = req.body.year;
  const phone = req.body.phone?.trim();
  const college = req.body.college?.trim();
  const eventIDs = req.body.eventIDs;
  const additionalInfo = req.body.additionalInfo?.trim();
  const paymentSS = req.file;

  try {
    // make sure all parameters are received
    if (!fullname) {
      logWarn("Tried to register event(s) without providing fullname", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'fullname' parameter is missing!"
      );
    }

    if (!email) {
      logWarn("Tried to register event(s) without providing email", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'email' parameter is missing!"
      );
    }

    if (!year) {
      logWarn("Tried to register event(s) without providing year", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'year' parameter is missing!"
      );
    }

    if (!eventIDs) {
      logWarn("Tried to register event(s) without providing event ids", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'eventIDs' parameter is missing!"
      );
    }

    if (!phone) {
      logWarn("Tried to register event(s) without providing phone number", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'phone' parameter is missing!"
      );
    }

    if (!college) {
      logWarn("Tried to register event(s) without providing college", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'college' parameter is missing!"
      );
    }

    if (!paymentSS) {
      logWarn("Tried to register event(s) without providing payment proof", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'paymentSS' parameter is missing!"
      );
    }

    // validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      logWarn("Tried to register event(s) with an invalid email", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid credentials!"
      );
    }

    // validate year
    if (year != 1 && year != 2 && year != 3 && year != 4) {
      logWarn("Tried to register event(s) with an invalid year", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Enter valid year!"
      );
    }

    // phone number validation
    if (!/^[6-9]{1}[0-9]{9}$/.test(phone)) {
      logWarn("Tried to register event(s) with an invalid phone number", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Enter a valid 10 digit phone number without country code!"
      );
    }

    const cloudinaryURL = await uploadOnCloudinary(paymentSS.path);

    // make sure no duplicate events are present
    if (new Set(eventIDs).size != eventIDs.length) {
      logWarn("Tried to register to duplicate events", "createRegistration @ controllers/registration.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Registration requested for duplicate events!"
      );
    }

    // make sure events are valid and calculate price
    let price = 0;
    for (let i = 0; i < eventIDs.length; i++) {
      // filter events with id (should return only one)
      const event = Events.filter((event) => event.id == eventIDs[i]);

      // check if the eventID exists in list
      if (event.length <= 0) {
      logWarn("Tried to register to events that do not exist", "createRegistration @ controllers/registration.ts");
        throw createHttpError(
          httpCodes["401"].code,
          httpCodes["401"].message +
            ": Registration requested for invalid events!"
        );
      }

      // NOTE : Should never happen (setup the event array properly)
      // check only one event is returned
      if (event.length > 1) {
        logErr("Multiple events exist in server with same index. FIX IMMEDIATELY", "createRegistration @ controllers/registration.ts");
        throw createHttpError(
          httpCodes["500"].code,
          httpCodes["500"].message + ": Server error! Sorry, working on it!"
        );
      }

      price += event[0].fee;
    }

    // retrieve authenticated user
    const user = await UserModel.findOne({ email: email }).exec();

    // check if user already registered in event
    const userRegisteredEventIDs = user?.registeredEventIDs; // user will definitely exist as checked by middleware
    if (user) {
      for (let i = 0; i < eventIDs.length; i++) {
        if (userRegisteredEventIDs!.includes(Number(eventIDs[i]))) {
          logWarn("Tried to register to events user is already registered in", "createRegistration @ controllers/registration.ts");
          throw createHttpError(
            httpCodes["401"].code,
            httpCodes["401"].message +
              ": User already registered in one or more events!"
          );
        }
      }
    } else {
      // check if registratin already exists from one email
      const registrations = await SSRegistrationModel.find({
        email: email,
      }).exec();
      let allEvents = new Array<number>();
      for (let i = 0; i < registrations.length; i++) {
        allEvents = [...allEvents, ...registrations[i].eventIDs];
      }

      for (let i = 0; i < eventIDs.length; i++) {
        for (let j = 0; j < allEvents.length; j++) {
          if (eventIDs[i] == allEvents[j]) {
            logWarn("Tried to register to events email id is already registered in", "createRegistration @ controllers/registration.ts");
            throw createHttpError(
              httpCodes["401"].code,
              httpCodes["401"].message +
                ": User already registered in one or more events!"
            );
          }
        }
      }
    }

    // create new user with given data
    const newRegistration = await SSRegistrationModel.create({
      userID: user?._id,
      fullName: fullname,
      email: email,
      year: year,
      phone: phone,
      college: college,
      eventIDs: eventIDs,
      totalPrice: price,
      paymentSSUrl: cloudinaryURL,
    });

    const mailRes = await sendMail(mailOptions(email));
    logDebug("Mail Sending Response:", mailRes, "createRegistration @ controllers/registrations.ts");
    logInfo(`Mail sent to ${email}`, "createRegistration @ controllers/registrations.ts");

    // additional info
    if (additionalInfo) {
      newRegistration.additionalInfo = additionalInfo;
      newRegistration.save();
    }

    if (user) {
      // add new registrations to user
      user!.pendingRegIDs = [...user!.pendingRegIDs, ...[newRegistration._id]];
      user!.save();
      logInfo("User update with new registration request", "createRegistration @ controllers/registrations.ts");
    }

    const response: ResSSRegistrationBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      userFullName: fullname,
      userEmail: email,
      userYear: year,
      userPhone: phone,
      userCollege: college,
      newRegisteredEventIDs: eventIDs,
      price: price,
      details: "Successfully created registration request!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// export const getRegistration: RequestHandler = async (_req, res, next) => {
//   try {
//     const registrations = await SSRegistrationModel.find(
//       {},
//       "fullName email phone year college paymentSSUrl confirmed eventIDs"
//     ).exec();
//
//     const transformed = registrations.map((reg) => ({
//       fullNname: reg.fullName,
//       email: reg.email,
//       phone: reg.phone,
//       paymentSSUrl: reg.paymentSSUrl,
//       confirmed: reg.confirmed,
//       eventIDs: reg.eventIDs,
//     }));
//     
//     res.status(httpCodes["200"].code).json({
//       status: httpCodes["200"].code,
//       message: httpCodes["200"].message,
//       registrations: transformed,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
