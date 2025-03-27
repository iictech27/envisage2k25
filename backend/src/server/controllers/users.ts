/* eslint-disable prefer-const */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import UserModel from "../../db/models/user.js";
import { httpCodes } from "../../util/httpCodes.js";
import validatedEnv from "../../util/validatedEnv.js";
import { Events, EventStructure } from "../../util/events.js";
import {
  ReqEmailVeriBody,
  ReqLoginBody,
  ReqResendEmailBody,
  ReqSignupBody,
  ResUserBody,
  ResUserRegEventsBody,
  ResUserSignupBody,
} from "../bodies/user.js";
import UnverifiedUserModel from "../../db/models/unverified_user.js";
import mailOptions from "../mails/verif_email.js";
import transport from "../services/nodemailer.js";
import SSRegistrationModel from "../../db/models/registration_ss.js";

const hashNum = validatedEnv.HASH_NUM;

// endpoint to retrieve data of currently logged in user
export const getAuthUser: RequestHandler = async (req, res, next) => {
  try {
    // get user with id from session token
    const user = await UserModel.findById(req.session.sessionToken).exec();

    const response: ResUserBody = {
      status: httpCodes["200"].code,
      message: httpCodes["200"].message,
      fullName: user!.fullName, // user wont be null as checked by middleware
      email: user!.email,
      registeredEventIDs: user!.registeredEventIDs,
      details: "Successfully retrieved authenticated user!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// endpoint to add/signup a user
export const signUp: RequestHandler<
  unknown,
  unknown,
  ReqSignupBody,
  unknown
> = async (req, res, next) => {
  const fullName = req.body.fullName?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();
  const confirmPassword = req.body.confirmPassword?.trim();

  try {
    // make sure all parameters are received
    if (!fullName || !email || !password || !confirmPassword) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Enter a valid email!"
      );
    }

    // make sure password is atleast 6 letter long
    if (password.length < 6) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Password should be atleast 6 characters long!"
      );
    }

    // make sure both password and confirmation are same
    if (password !== confirmPassword) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Password and Confirm Password do not match!"
      );
    }

    // check if account with email exists
    const userWithEmail = await UserModel.findOne({ email: email }).exec();
    if (userWithEmail) {
      throw createHttpError(
        httpCodes["409"].code,
        httpCodes["409"].message +
          ": Account with e-mail already exists! Try logging in instead."
      );
    }

    const unverifiedUserWithEmail = await UnverifiedUserModel.findOne({
      email: email,
    }).exec();

    if (unverifiedUserWithEmail) {
      const now = new Date().valueOf();
      const oneDayAfterRequestCreated = new Date(unverifiedUserWithEmail.createdAt.getTime() + (24 * 60 * 60 * 1000));
      const difference = now - oneDayAfterRequestCreated.valueOf();

      // one day has not passed since request
      if(difference > 0) {
        throw createHttpError(
          httpCodes["409"].code,
          httpCodes["409"].message +
            ": sign up request already exists. check your inbox and verify email. if this wasnt you, contact the admin team"
        );
      }
    }

    // random 6 digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

    // create new user with given data
    const newUnverifiedUser = await UnverifiedUserModel.create({
      fullName: fullName,
      email: email,
      hashedPassword: await bcrypt.hash(password, hashNum),
      hashedOtp: await bcrypt.hash(otp.toString(), hashNum),
      otpExpiresAt: tenMinutesLater,
      otpRegenAt: now,
    });

    transport.sendMail(mailOptions(email, otp.toString()));

    // create a response to sent to client
    const response: ResUserSignupBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      fullName: newUnverifiedUser.fullName,
      userID: newUnverifiedUser._id.toString(),
      email: newUnverifiedUser.email,
      details: "Successfully created new signup request!",
    };

    res.status(response.status);
    res.json(response);

  } catch (error) {
    next(error);
  }
};

// endpoint to verify user
export const verifyEmail: RequestHandler<
  unknown,
  unknown,
  ReqEmailVeriBody,
  unknown
> = async (req, res, next) => {
  const userID = req.body.userID;
  const otp = req.body.otp;

  try {
    if (!otp) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No otp provided!"
      );
    }

    if(!userID) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No User ID provided!"
      );
    }

    const unverifiedUser = await UnverifiedUserModel.findById(
      new mongoose.Types.ObjectId(userID)
    ).exec();

    if (!unverifiedUser) {
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message + ": No signup request for user!"
      );
    }

    const now = new Date().valueOf();
    const difference = unverifiedUser.otpExpiresAt.valueOf() - now;

    // otp has expired
    if (difference <= 0) {
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message +
          ": Verification code has expired! Request another."
      );
    }

    const otpMatched = await bcrypt.compare(otp, unverifiedUser.hashedOtp);
    if (!otpMatched) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid OTP!"
      );
    }


    const newUser = await UserModel.create({
      fullName: unverifiedUser.fullName,
      email: unverifiedUser.email,
      hashedPassword: unverifiedUser.hashedPassword,
    });

    // check if there are any user-less registrations from the account's email and link with this account
    const registrations = await SSRegistrationModel.find({email: unverifiedUser.email}).exec();
    for(let i = 0; i < registrations.length; i++) {
      if (registrations[i].confirmed) {

        newUser!.registeredEventIDs = [...newUser.registeredEventIDs!, ...registrations[i].eventIDs];
        newUser!.registrationIDs = [...newUser!.registrationIDs, ...[registrations[i]._id]];

      } else if (registrations[i].rejected) {

        newUser!.rejectedRegIDs = [...newUser!.rejectedRegIDs, ...[registrations[i]._id]];

      } else {

        newUser!.pendingRegIDs = [...newUser!.pendingRegIDs, ...[registrations[i]._id]];

      }

      registrations[i].userID = newUser._id;
    }
    newUser.save();


    UnverifiedUserModel.findByIdAndDelete(unverifiedUser._id).exec();

    // create a response to sent to client
    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      fullName: newUser.fullName,
      email: newUser.email,
      details: "Successfully verified user!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// endpoint to resend verification mail
export const resendVerifyEmail: RequestHandler<
  unknown,
  unknown,
  ReqResendEmailBody,
  unknown
> = async (req, res, next) => {
  const userID = req.body.userID;

  try {
    if(!userID) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No User ID provided!"
      );
    }

    const unverifiedUser = await UnverifiedUserModel.findById(
      new mongoose.Types.ObjectId(userID)
    ).exec();

    if (!unverifiedUser) {
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message + ": No signup request for user!"
      );
    }

    const now = new Date().valueOf();
    const difference = unverifiedUser.otpRegenAt.valueOf() - now;

    if (difference >= 0) {
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message +
          ": Please wait for atleast 1 minute before sending new request!"
      );
    }

    // random 6 digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newNow = new Date();
    const tenMinutesLater = new Date(newNow.getTime() + 10 * 60 * 1000);
    const oneMinutesLater = new Date(newNow.getTime() + 60 * 1000);

    // create new user with given data
    unverifiedUser.hashedOtp = await bcrypt.hash(otp.toString(), hashNum);
    unverifiedUser.otpExpiresAt = tenMinutesLater;
    unverifiedUser.otpRegenAt = oneMinutesLater;
    unverifiedUser.save();

    transport.sendMail(mailOptions(unverifiedUser.email, otp.toString()));

    // create a response to sent to client
    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      details: "Successfully sent new verification otp!",
      fullName: unverifiedUser.fullName,
      email: unverifiedUser.email,
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// endpoint to login to a user
export const logIn: RequestHandler<
  unknown,
  unknown,
  ReqLoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();
  const rememberUser = req.body.rememberUser;

  try {
    // make sure all parameters are received
    if (!email || !password) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid credentials!"
      );
    }

    // fetch user with given credentials
    const user = await UserModel.findOne({ email: email }).exec();

    // make sure user with credentials exists
    if (!user) {
      const unverifiedUserWithEmail = await UnverifiedUserModel.findOne({
        email: email,
      }).exec();
      if (unverifiedUserWithEmail) {
        throw createHttpError(
          httpCodes["409"].code,
          httpCodes["409"].message +
            ": Sign up request already exists. Check your inbox and verify email."
        );
      }

      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid credentials!"
      );
    }

    // check password
    const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatched) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid credentials!"
      );
    }

    // create and save session token which is the hashed mongo uid
    req.session.sessionToken = user._id;
    if (rememberUser) {
      req.session.cookie.maxAge =
        validatedEnv.SESSION_EXP_MAX_HR * 60 * 60 * 1000;
    } else {
      req.session.cookie.maxAge = validatedEnv.SESSION_EXP_MIN_M * 60 * 1000;
    }

    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      fullName: user.fullName,
      email: user.email,
      details: "Successfully logged in to user account!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// endpoint ot logout of a user
export const logOut: RequestHandler = (req, res, next) => {
  try {
    if (req.session && req.session.cookie) {
      // manually unset cookie
      res.cookie("connect.sid", null, {
        expires: new Date("Thu, 01 Jan 1970 00:00:00 UTC"), // random day in the past
        httpOnly: true,
      });

      // try to destroy session
      req.session.destroy((error) => {
        if (error) {
          next(error);
        } else {
          res.status(httpCodes["200"].code);
          res.send("User logged out successfully!");
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// endpoint to get registered events of a user
export const getRegEvents: RequestHandler = async (req, res, next) => {
  try {
    // find user using user id from session token
    const user = await UserModel.findById(req.session.sessionToken).exec();
    const userRegisteredEventIDs = user!.registeredEventIDs; // user will always be available as ensured by middleware
    let eventsDetails: EventStructure[] = [];

    // user will definitely exist from middleware
    for (let i = 0; i < userRegisteredEventIDs.length; i++) {
      // filter events with id (should return only one)
      const event = Events.filter(
        (event) => event.id == userRegisteredEventIDs[i]
      );

      // check only one event is returned
      if (event.length > 1) {
        throw createHttpError(
          httpCodes["500"].code,
          httpCodes["500"].message + ": Server error! Sorry, working on it!"
        );
      }

      // add event to list
      eventsDetails.push(event[0]);
    }

    const response: ResUserRegEventsBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      events: eventsDetails,
      details: "Successfully retrieved user registrations!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
