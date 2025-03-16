import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import UserModel from "../../db/models/user.js";
import httpCodes from "../../util/httpCodes.js";
import validatedEnv from "../../util/validatedEnv.js";
import { UserLoginBody, UserSignupBody } from "../requestBodies/user.js";

const hashNum = validatedEnv.HASH_NUM;

// endpoint to retrieve data of currently logged in user
export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {
    const hashedAuthUserID = req.session.hashedUserID;

    try {

        // check if the user is authenticated i.e. the session token exists
        if(!hashedAuthUserID) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!");
        }

        // retrieve all users
        const users = await UserModel.find().exec();

        // loop through all users and match the userID with the hashed version
        for await (const user of users) {
            const matchedUserID = await bcrypt.compare(user._id.toString(), hashedAuthUserID);
            if(matchedUserID) {
                res.status(httpCodes["200"].code);
                res.json(user);
                return;
            }
        }

        throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!");

    } catch(error) {
        next(error);
    }
}


// endpoint to add/signup a user
export const signUp: RequestHandler<unknown, unknown, UserSignupBody, unknown> = async (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    try {

        // make sure all parameters are received
        if(!fullName || !email || !password) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // check if account with email exists
        const existingEmail = await UserModel.findOne({ email: email }).exec();
    if(existingEmail) {
        throw createHttpError(httpCodes["409"].code, httpCodes["409"].message + ": Account with e-mail already exists! Try logging in instead.");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, hashNum);

    // create new user with given data
    const newUser = await UserModel.create({
        fullName: fullName,
        email: email,
        hashedPassword: hashedPassword
    });

    // create and save session token which is the hashed mongo uid
    req.session.hashedUserID = await bcrypt.hash(newUser._id.toString(), hashNum);

    res.status(httpCodes["201"].code);
    res.json(newUser);

    } catch(error) {
        next(error);
    }
}

// endpoint to login to a user
export const logIn: RequestHandler<unknown, unknown, UserLoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        // make sure all parameters are received
        if(!email || !password) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // fetch user with given credentials
        const user = await UserModel.findOne({ email: email }).select("+password +email").exec();

        // check if user with credentials exists
        if(!user) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // check password
        const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
        if(!passwordMatched) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // create and save session token which is the hashed mongo uid
        req.session.hashedUserID = await bcrypt.hash(user._id.toString(), hashNum);

        res.status(httpCodes["201"].code);
        res.json(user);

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

        res.sendStatus(httpCodes["200"].code);
    });
}
