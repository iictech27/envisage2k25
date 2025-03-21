import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import UserModel from "../../db/models/user.js";
import { httpCodes } from "../../util/httpCodes.js";
import validatedEnv from "../../util/validatedEnv.js";
import { Events, EventStructure } from "../../util/events.js";
import { ReqLoginBody, ReqSignupBody, ResUserBody, ResUserRegEventsBody } from "../bodies/user.js";

const hashNum = validatedEnv.HASH_NUM;

// endpoint to retrieve data of currently logged in user
export const getAuthUser: RequestHandler = async(req, res, next) => {
    try {

        // get user with id from session token
        const user = await UserModel.findById(req.session.sessionToken).select("+email +registeredEventIDs").exec();

        const response: ResUserBody = {
            status: httpCodes["200"].code,
            message: httpCodes["200"].message,
            fullName: user!.fullName, // user wont be null as checked by middleware
            email: user!.email,
            registeredEventIDs: user!.registeredEventIDs,
            details: "Successfully retrieved authenticated user!"
        }

        res.status(response.status);
        res.json(response);

    } catch(error) {
        next(error);
    }
}

// endpoint to add/signup a user
export const signUp: RequestHandler<unknown, unknown, ReqSignupBody, unknown> = async (req, res, next) => {
    const fullName = req.body.fullName?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();

    try {

        // make sure all parameters are received
        if(!fullName || !email || !password || !confirmPassword) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // validate email
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Enter a valid email!");
        }

        // make sure password is atleast 6 letter long
        if(password.length < 6) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Password should be atleast 6 characters long!");
        }

        // make sure both password and confirmation are same
        if(password !== confirmPassword) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Password and Confirm Password do not match!");
        }

        // check if account with email exists
        const userWithEmail = await UserModel.findOne({ email: email }).exec();
    if(userWithEmail) {
        throw createHttpError(httpCodes["409"].code, httpCodes["409"].message + ": Account with e-mail already exists! Try logging in instead.");
    }

    // create new user with given data
    const newUser = await UserModel.create({
        fullName: fullName,
        email: email,
        hashedPassword: await bcrypt.hash(password, hashNum)
    });

    // create a response to sent to client
    const response: ResUserBody = {
        status: httpCodes["201"].code,
        message: httpCodes["201"].message,
        fullName: newUser.fullName,
        email: newUser.email,
        details: "Successfully created new user account!"
    };

    res.status(response.status);
    res.json(response);

    } catch(error) {
        next(error);
    }
}

// endpoint to login to a user
export const logIn: RequestHandler<unknown, unknown, ReqLoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    const rememberUser = req.body.rememberUser;

    try {

        // make sure all parameters are received
        if(!email || !password) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // validate email
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // fetch user with given credentials
        const user = await UserModel.findOne({ email: email }).select("+hashedPassword +email").exec();

        // make sure user with credentials exists
        if(!user) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // check password
        const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
        if(!passwordMatched) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // create and save session token which is the hashed mongo uid
        req.session.sessionToken = user._id;
        if(rememberUser) {
            req.session.cookie.maxAge = validatedEnv.SESSION_EXP_MAX_HR * 60 * 60 * 1000;
        }

        const response: ResUserBody = {
            status: httpCodes["201"].code,
            message: httpCodes["201"].message,
            fullName: user.fullName,
            email: user.email,
            details: "Successfully logged in to user account!"
        };

        res.status(response.status);
        res.json(response);

    } catch(error) {
        next(error);
    }
}

// endpoint ot logout of a user
export const logOut: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if(error) {
            next(error);
            return;
        }

        res.status(httpCodes["200"].code);
        res.send("User logged out successfully!");
    });
}

// endpoint to get registered events of a user
export const getRegEvents: RequestHandler = async (req, res, next) => {
    try {

        // find user using user id from session token
        const user = await UserModel.findById(req.session.sessionToken).select("+registeredEventIDs").exec();
        const userRegisteredEventIDs = user!.registeredEventIDs; // user will always be available as ensured by middleware
        let eventsDetails: EventStructure[] = [];

        // user will definitely exist from middleware
        for(let i = 0; i < userRegisteredEventIDs.length; i++) {

            // filter events with id (should return only one)
            const event = Events.filter((event) => event.id == userRegisteredEventIDs[i]);

            // check only one event is returned
            if(event.length > 1) {
                throw createHttpError(httpCodes["500"].code, httpCodes["500"].message + ": Server error! Sorry, working on it!");
            }

            // add event to list
            eventsDetails.push(event[0]);

        }

        const response: ResUserRegEventsBody = {
            status: httpCodes["201"].code,
            message: httpCodes["201"].message,
            events: eventsDetails,
            details: "Successfully retrieved user registrations!"
        }

        res.status(response.status);
        res.json(response);

    } catch(error) {
        next(error);
    }
}
