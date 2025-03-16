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
        const users = await UserModel.find().select("+email").exec();

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
    const confirmPassword = req.body.confirmPassword;
    const hashedAuthUserID = req.session.hashedUserID;

    try {

        // check if the user is authenticated i.e. the session token exists
        if(hashedAuthUserID) {
            throw createHttpError(httpCodes["403"].code, httpCodes["403"].message + ": User already logged in!");
        }

        // make sure all parameters are received
        if(!fullName || !email || !password || !confirmPassword) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // validate email
        if (!email.trim()) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // make sure password is atleast 6 letter long
        if(password.trim().length < 6) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // make sure both password and confirmation are same
        if(password.trim() !== confirmPassword.trim()) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // check if account with email exists
        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if(existingEmail) {
            throw createHttpError(httpCodes["409"].code, httpCodes["409"].message + ": Account with e-mail already exists! Try logging in instead.");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password.trim(), hashNum);

        // create new user with given data
        const newUser = await UserModel.create({
            fullName: fullName,
            email: email,
            hashedPassword: hashedPassword
        });

        res.status(httpCodes["201"].code);
        res.json({ message: "New User with email '"+ newUser.email +"' Signed Up Successfully! "  });

    } catch(error) {
        next(error);
    }
}

// endpoint to login to a user
export const logIn: RequestHandler<unknown, unknown, UserLoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberUser = req.body.rememberUser;
    const hashedAuthUserID = req.session.hashedUserID;

    try {

        // check if the user is authenticated i.e. the session token exists
        if(hashedAuthUserID) {
            throw createHttpError(httpCodes["403"].code, httpCodes["403"].message + ": User already logged in!");
        }

        // make sure all parameters are received
        if(!email || !password) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // validate email
        if (!email.trim()) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // fetch user with given credentials
        const user = await UserModel.findOne({ email: email }).select("+hashedPassword +email").exec();

        // check if user with credentials exists
        if(!user) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        // check password
        const passwordMatched = await bcrypt.compare(password, user.hashedPassword);
        if(!passwordMatched) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid credentials!");
        }

        if(rememberUser) {
            // create and save session token which is the hashed mongo uid
            req.session.hashedUserID = await bcrypt.hash(user._id.toString(), hashNum);
        }

        res.status(httpCodes["201"].code);
        res.json({ message: "User with email '" + user.email + "'Logged In Succesfully!" });

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
