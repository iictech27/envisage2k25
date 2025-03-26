/* eslint-disable prefer-const */
import { RequestHandler } from "express";
import SSRegistrationModel from "../../db/models/registration_ss.js";
import { ResRegAdmin } from "../bodies/admin.js";
import { httpCodes } from "../../util/httpCodes.js";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import UserModel from "../../db/models/user.js";
import { Events } from "../../util/events.js";
import transport from "../services/nodemailer.js";
import regRejectedMail from "../mails/reg_rejected.js";
import regVerifiedMail from "../mails/reg_verified.js";

export const getRegistrations: RequestHandler = async (_req, res, next) => {
  try {
    const registrations = await SSRegistrationModel.find().exec();

    let resReg: ResRegAdmin = {
      status: httpCodes["200"].code,
      message: httpCodes["200"].message,
      registrations: [],
      details: "Successfully fetched and returned registrations!",
    };

    for (let i = 0; i < registrations.length; i++) {
      const reg = registrations[i];
      resReg.registrations.push({
        regID: reg._id.toString(),
        email: reg.email,
        fullname: reg.fullName,
        events: reg.eventIDs,
        paymentProof: reg.paymentSSUrl,
        verified: reg.confirmed,
        phone: reg.phone,
        year: reg.year,
        college: reg.college,
        totalPrice: reg.totalPrice as number,
        rejected: reg.rejected,
      });
    }

    res.status(200);
    res.json(resReg);
  } catch (error) {
    next(error);
  }
};

export const verifyRegistration: RequestHandler = async (req, res, next) => {
  const registrationID = req.body.regID?.trim();

  try {
    if (!registrationID) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'regID' parameter is missing!"
      );
    }

    const reg = await SSRegistrationModel.findById(
      new mongoose.Types.ObjectId(registrationID)
    ).exec();

    if (!reg) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No registration with given id exists"
      );
    }

    const user = await UserModel.findById(reg?.userID).exec();

    // if(!user) {
    //   throw createHttpError(
    //     httpCodes["400"].code,
    //     httpCodes["400"].message + ": The user who started the registration no longer exists"
    //   );
    // }

    let eventNames = "";
    if (reg.eventIDs.length > 1) {
      for (let i = 0; i < reg.eventIDs.length - 2; i++) {
        eventNames += Events.filter(
          (event) => event.id == reg.eventIDs[i]
        )[0].name += ", ";
      }
      eventNames += Events.filter(
        (event) => event.id == reg.eventIDs[reg.eventIDs.length - 2]
      )[0].name += " and ";
    }
    eventNames += Events.filter(
      (event) => event.id == reg.eventIDs[reg.eventIDs.length - 1]
    )[0].name;

    if (user) {
      // delete from pending
      const pendingIndex = user.pendingRegIDs.indexOf(reg._id, 0);
      if (pendingIndex > -1) {
        user!.pendingRegIDs.splice(pendingIndex, 1); // delete pending reg
      }

      // delete from rejected
      const rejIndex = user.rejectedRegIDs.indexOf(reg._id, 0);
      if (rejIndex > -1) {
        user!.rejectedRegIDs.splice(rejIndex, 1); // delete verified reg
      }

      user!.registeredEventIDs = [...user.registeredEventIDs!, ...reg.eventIDs];
      user!.registrationIDs = [...user!.registrationIDs, ...[reg._id]];
      user!.save();
    }

    reg.confirmed = true;
    reg.rejected = false;
    reg.expireAt = null;
    reg.save();

    transport.sendMail(regVerifiedMail(reg.email, eventNames));

    res.status(httpCodes["200"].code);
    res.send(httpCodes["200"].message + ": Verified successfully!");
  } catch (error) {
    next(error);
  }
};

export const rejectRegistration: RequestHandler = async (req, res, next) => {
  const registrationID = req.body.regID?.trim();

  try {
    if (!registrationID) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'regID' parameter is missing!"
      );
    }

    const reg = await SSRegistrationModel.findById(
      new mongoose.Types.ObjectId(registrationID)
    ).exec();

    if (!reg) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No registration with given id exists"
      );
    }

    const user = await UserModel.findById(reg?.userID).exec();

    // if(!user) {
    //   throw createHttpError(
    //     httpCodes["400"].code,
    //     httpCodes["400"].message + ": The user who started the registration no longer exists"
    //   );
    // }

    let eventNames = "";
    if (reg.eventIDs.length > 1) {
      for (let i = 0; i < reg.eventIDs.length - 2; i++) {
        eventNames += Events.filter(
          (event) => event.id == reg.eventIDs[i]
        )[0].name += ", ";
      }
      eventNames += Events.filter(
        (event) => event.id == reg.eventIDs[reg.eventIDs.length - 2]
      )[0].name += " and ";
    }
    eventNames += Events.filter(
      (event) => event.id == reg.eventIDs[reg.eventIDs.length - 1]
    )[0].name;

    if (user) {
      // remove from pending
      const index = user.pendingRegIDs.indexOf(reg._id, 0);
      if (index > -1) {
        user!.pendingRegIDs.splice(index, 1); // delete pending reg
      }

      // remove from verified
      const veriIndex = user.registrationIDs.indexOf(reg._id, 0);
      if (veriIndex > -1) {
        user!.registrationIDs.splice(veriIndex, 1); // delete verified reg
      }

      // delete ids
      for (let i = 0; i < reg.eventIDs.length; i++) {
        const eventIndex = user.registeredEventIDs.indexOf(reg.eventIDs[i], 0);
        if (eventIndex > -1) {
          user!.registeredEventIDs.splice(eventIndex, 1); // delete event id
        }
      }

      user!.rejectedRegIDs = [...user!.rejectedRegIDs, ...[reg._id]];
      user!.save();
    }

    reg.confirmed = false;
    reg.rejected = true;
    const now = new Date();
    // const twentySecLater = new Date(now.getTime() + (20 * 1000));
    // reg.expireAt = twentySecLater;
    const sevenDaysLater = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
    reg.expireAt = sevenDaysLater;
    reg.save();

    transport.sendMail(regRejectedMail(reg.email, eventNames));

    res.status(httpCodes["200"].code);
    res.send(httpCodes["200"].message + ": Rejected successfully!");
  } catch (error) {
    next(error);
  }
};

export const deleteRegistration: RequestHandler = async (req, res, next) => {
  const registrationID = req.body.regID?.trim();

  try {
    if (!registrationID) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": 'regID' parameter is missing!"
      );
    }

    const reg = await SSRegistrationModel.findById(
      new mongoose.Types.ObjectId(registrationID)
    ).exec();

    if (!reg) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No registration with given id exists"
      );
    }

    const user = await UserModel.findById(reg?.userID).exec();

    // if(!user) {
    //   throw createHttpError(
    //     httpCodes["400"].code,
    //     httpCodes["400"].message + ": The user who started the registration no longer exists"
    //   );
    // }

    if (user) {
      // delete from pending
      const pendingIndex = user.pendingRegIDs.indexOf(reg._id, 0);
      if (pendingIndex > -1) {
        user!.pendingRegIDs.splice(pendingIndex, 1); // delete pending reg
      }

      // delete from verified
      const veriIndex = user.registrationIDs.indexOf(reg._id, 0);
      if (veriIndex > -1) {
        user!.registrationIDs.splice(veriIndex, 1); // delete verified reg
      }

      // delete from rejected
      const rejIndex = user.rejectedRegIDs.indexOf(reg._id, 0);
      if (rejIndex > -1) {
        user!.rejectedRegIDs.splice(rejIndex, 1); // delete verified reg
      }

      // delete ids
      for (let i = 0; i < reg.eventIDs.length; i++) {
        const eventIndex = user.registeredEventIDs.indexOf(reg.eventIDs[i], 0);
        if (eventIndex > -1) {
          user!.registeredEventIDs.splice(eventIndex, 1); // delete event id
        }
      }

      user.save();
    }

    await SSRegistrationModel.findByIdAndDelete(reg._id).exec();

    res.status(httpCodes["200"].code);
    res.send(httpCodes["200"].message + ": Deleted successfully!");
  } catch (error) {
    next(error);
  }
};
