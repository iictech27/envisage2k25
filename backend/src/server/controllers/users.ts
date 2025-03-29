/* eslint-disable prefer-const */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import UserModel from "../../db/models/user.js";
import { httpCodes } from "../../util/httpCodes.js";
import validatedEnv from "../../util/validatedEnv.js";
// import { Events, EventStructure } from "../../util/events.js";
import {
  ReqEmailVeriBody,
  ReqLoginBody,
  ReqResendEmailBody,
  ReqSignupBody,
  ResUserBody,
  // ResUserRegEventsBody,
  ResUserSignupBody,
} from "../bodies/user.js";
import UnverifiedUserModel from "../../db/models/unverified_user.js";
import mailOptions from "../mails/verif_email.js";
import transport from "../services/nodemailer.js";
import SSRegistrationModel from "../../db/models/registration_ss.js";
import { logDebug, logInfo, logWarn } from "../../util/logger.js";
import { sendMail } from "../services/email_handler.js";

const hashNum = validatedEnv.HASH_NUM;

// endpoint to retrieve data of currently logged in user
export const getAuthUser: RequestHandler = async (req, res, next) => {

  // NOTE: protected by requireAuthUser middleware

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

    logInfo("Successfully retrieved authenticated user", "getAuthUser @ controllers/users.ts");
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

  // NOTE: protected by requireUnathUser middleware
  
  logDebug("Signup Request Body:", req.body, "signUp @ controllers/users.ts");

  const fullName = req.body.fullName?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();
  const confirmPassword = req.body.confirmPassword?.trim();

  try {
    // make sure all parameters are received
    if (!fullName || !email || !password || !confirmPassword) {
      logWarn("Tried to signup user without all parameters", "signUp @ controllers/users.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      logWarn("Tried to signup user with an invalid email", "signUp @ controllers/users.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Enter a valid email!"
      );
    }

    // make sure password is atleast 6 letter long
    if (password.length < 6) {
      logWarn("Tried to signup user with password lower than 6 characters", "signUp @ controllers/users.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Password should be atleast 6 characters long!"
      );
    }

    // make sure both password and confirmation are same
    if (password !== confirmPassword) {
      logWarn("Tried to signup user with mismatching password and confirm password", "signUp @ controllers/users.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Password and Confirm Password do not match!"
      );
    }

    // check if account with email exists
    const userWithEmail = await UserModel.findOne({ email: email }).exec();
    if (userWithEmail) {
      logWarn("Tried to signup user but user already exists", "signUp @ controllers/users.ts");
      throw createHttpError(
        httpCodes["409"].code,
        httpCodes["409"].message +
          ": Account with e-mail already exists! Try logging in instead."
      );
    }

    const unverifiedUserWithEmail = await UnverifiedUserModel.findOne({
      email: email,
    }).exec();

    // random 6 digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
    let response: ResUserSignupBody;

    if (unverifiedUserWithEmail) {
      unverifiedUserWithEmail.fullName = fullName;
      unverifiedUserWithEmail.email = email;
      unverifiedUserWithEmail.hashedPassword = await bcrypt.hash(password, hashNum);
      unverifiedUserWithEmail.hashedOtp = await bcrypt.hash(otp.toString(), hashNum);
      unverifiedUserWithEmail.otpExpiresAt = tenMinutesLater;
      unverifiedUserWithEmail.otpRegenAt = now;
      await unverifiedUserWithEmail.save();

      // create a response to sent to client
      response = {
        status: httpCodes["201"].code,
        message: httpCodes["201"].message,
        fullName: unverifiedUserWithEmail.fullName,
        userID: unverifiedUserWithEmail._id.toString(),
        email: unverifiedUserWithEmail.email,
        details: "Successfully created new signup request!",
      };

      logInfo("Successfully updated signup request.", "signUp @ controllers/user.ts");

    } else {
      // create new user with given data
      const newUnverifiedUser = await UnverifiedUserModel.create({
        fullName: fullName,
        email: email,
        hashedPassword: await bcrypt.hash(password, hashNum),
        hashedOtp: await bcrypt.hash(otp.toString(), hashNum),
        otpExpiresAt: tenMinutesLater,
        otpRegenAt: now,
      });

      // create a response to sent to client
      response = {
        status: httpCodes["201"].code,
        message: httpCodes["201"].message,
        fullName: newUnverifiedUser.fullName,
        userID: newUnverifiedUser._id.toString(),
        email: newUnverifiedUser.email,
        details: "Successfully created new signup request!",
      };

      logInfo("Successfully created new signup request.", "signUp @ controllers/user.ts");
    }

    const mailRes = await sendMail(mailOptions(email, otp.toString()));
    logInfo(`Mail sent to ${email}`, "signUp @ controllers/user.ts");
    logDebug("Mail Sending Response:", mailRes, "signUp @ controllers/users.ts");

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

  // NOTE: protected by requireUnathUser middleware

  logDebug("Verify Email Request Body:", req.body, "verifyEmail @ controllers/users.ts");

  const userID = req.body.userID;
  const otp = req.body.otp;

  try {
    if (!otp) {
      logWarn("Tried to verify user without providing otp", "verifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No otp provided!"
      );
    }

    if (!userID) {
      logWarn("Tried to verify user without providing user id", "verifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No User ID provided!"
      );
    }

    const unverifiedUser = await UnverifiedUserModel.findById(
      new mongoose.Types.ObjectId(userID)
    ).exec();

    if (!unverifiedUser) {
      logWarn("Tried to verify user who hasnt sent a signup request", "verifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message + ": No signup request for user!"
      );
    }

    const now = new Date().valueOf();
    const difference = unverifiedUser.otpExpiresAt.valueOf() - now;

    // otp has expired
    if (difference <= 0) {
      logWarn("Tried to verify user with expired otp", "verifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message +
          ": Verification code has expired! Request another."
      );
    }

    const otpMatched = await bcrypt.compare(otp, unverifiedUser.hashedOtp);
    if (!otpMatched) {
      logWarn("Tried to verify user with wrong otp", "verifyEmail @ controllers/users.ts");
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
    const registrations = await SSRegistrationModel.find({
      email: unverifiedUser.email,
    }).exec();
    for (let i = 0; i < registrations.length; i++) {
      if (registrations[i].confirmed) {
        newUser!.registeredEventIDs = [
          ...newUser.registeredEventIDs!,
          ...registrations[i].eventIDs,
        ];
        newUser!.registrationIDs = [
          ...newUser!.registrationIDs,
          ...[registrations[i]._id],
        ];
      } else if (registrations[i].rejected) {
        newUser!.rejectedRegIDs = [
          ...newUser!.rejectedRegIDs,
          ...[registrations[i]._id],
        ];
      } else {
        newUser!.pendingRegIDs = [
          ...newUser!.pendingRegIDs,
          ...[registrations[i]._id],
        ];
      }

      registrations[i].userID = newUser._id;
	    await registrations[i].save();
    }
    await newUser.save();

    await UnverifiedUserModel.findByIdAndDelete(unverifiedUser._id).exec();

    // create a response to sent to client
    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      fullName: newUser.fullName,
      email: newUser.email,
      details: "Successfully verified user!",
    };

    logInfo("Successfully verified user.", "verifyEmail @ controllers/user.ts");

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

  // NOTE: protected by requireUnathUser middleware

  logDebug("Resend Verify Request Body:", req.body, "resendVerifyEmail @ controllers/users.ts");

  const userID = req.body.userID;

  try {
    if (!userID) {
      logWarn("Tried to resend email without providing user id", "resendVerifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": No User ID provided!"
      );
    }

    const unverifiedUser = await UnverifiedUserModel.findById(
      new mongoose.Types.ObjectId(userID)
    ).exec();

    if (!unverifiedUser) {
      logWarn("Tried to resend email to an user who hasnt sent a singup request", "resendVerifyEmail @ controllers/users.ts");
      throw createHttpError(
        httpCodes["403"].code,
        httpCodes["403"].message + ": No signup request for user!"
      );
    }

    const now = new Date().valueOf();
    const difference = unverifiedUser.otpRegenAt.valueOf() - now;

    if (difference >= 0) {
      logWarn("Tried to resend email too soon since last request. have to wait for atleast 1 minute", "resendVerifyEmail @ controllers/users.ts");
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
    await unverifiedUser.save();

    const mailRes = await sendMail(mailOptions(unverifiedUser.email, otp.toString()));
    logInfo(`Mail sent to ${unverifiedUser.email}`, "resendVerifyEmail @ controllers/user.ts");
    logDebug("Mail Sending Response:", mailRes, "resendVerifyEmail @ controllers/users.ts");

    // create a response to sent to client
    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      details: "Successfully sent new verification otp!",
      fullName: unverifiedUser.fullName,
      email: unverifiedUser.email,
    };

    logInfo("Successfully resent verification mail.", "resendVerifyEmail @ controllers/user.ts");

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

  // NOTE: protected by requireUnathUser middleware

  logDebug("Login Request Body:", req.body, "logIn @ controllers/users.ts");

  const email = req.body.email?.trim();
  const password = req.body.password?.trim();
  const rememberUser = req.body.rememberUser;

  try {
    // make sure all parameters are received
    if (!email || !password) {
      logWarn("Tried to login user without all parameters", "logIn @ controllers/users.ts");
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      logWarn("Tried to login user with invalid email", "logIn @ controllers/users.ts");
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
        logWarn("Tried to login user with unverified email", "logIn @ controllers/users.ts");
        throw createHttpError(
          httpCodes["409"].code,
          httpCodes["409"].message +
            ": Sign up request already exists. Check your inbox and verify email."
        );
      }

      logWarn("Tried to login user with no account", "logIn @ controllers/users.ts");
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid credentials!"
      );
    }

    // check password
    const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatched) {
      logWarn("Tried to login user with invalid password", "logIn @ controllers/users.ts");
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

    logDebug("Login Session:", req.session, "logIn @ controllers/users.ts");

    const response: ResUserBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      fullName: user.fullName,
      email: user.email,
      details: "Successfully logged in to user account!",
    };

    logInfo("Successfully logged in user.", "logIn @ controllers/user.ts");

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
          logInfo("Successfully logged out user.", "logOut @ controllers/user.ts");
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
// export const getRegEvents: RequestHandler = async (req, res, next) => {
//
//   // NOTE: protected by requireAuthUser middleware
//
//   try {
//     // find user using user id from session token
//     const user = await UserModel.findById(req.session.sessionToken).exec();
//     const userRegisteredEventIDs = user!.registeredEventIDs; // user will always be available as ensured by middleware
//     let eventsDetails: EventStructure[] = [];
//
//     // user will definitely exist from middleware
//     for (let i = 0; i < userRegisteredEventIDs.length; i++) {
//       // filter events with id (should return only one)
//       const event = Events.filter(
//         (event) => event.id == userRegisteredEventIDs[i]
//       );
//
//       // check only one event is returned
//       if (event.length > 1) {
//         throw createHttpError(
//           httpCodes["500"].code,
//           httpCodes["500"].message + ": Server error! Sorry, working on it!"
//         );
//       }
//
//       // add event to list
//       eventsDetails.push(event[0]);
//     }
//
//     const response: ResUserRegEventsBody = {
//       status: httpCodes["201"].code,
//       message: httpCodes["201"].message,
//       events: eventsDetails,
//       details: "Successfully retrieved user registrations!",
//     };
//
//     res.status(response.status);
//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// };
