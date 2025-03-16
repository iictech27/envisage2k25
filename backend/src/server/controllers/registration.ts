import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import RegistrationModel from "../../db/models/registration.js";
import httpCodes from "../../util/httpCodes.js";
import { RegistrationBody } from "../requestBodies/registration.js";
import { Events, EventsEnum } from "../../util/eventsEnum.js";
import UserModel from "../../db/models/user.js";

// endpoint to create a registration
export const createRegistration: RequestHandler<unknown, unknown, RegistrationBody, unknown> = async (req, res, next) => {
    const department = req.body.department;
    const year = req.body.year;
    const events = req.body.events;
    const additionalInfo = req.body.additionalInfo;
    const hashedAuthUserID = req.session.hashedUserID;

    try {

        // check if the user is authenticated i.e. the session token exists
        if(!hashedAuthUserID) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!");
        }

        // make sure all parameters are received
        if(!department || !year || !events ) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }

        // validate year
        if (year != 1 && year != 2 && year != 3 && year != 4) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
        }

        // make sure no duplicate events are present
        if(new Set(events).size != events.length) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
        }

        // make sure events are valid
        let price = 0;
        for(const event in events) {
            if(!Object.values(EventsEnum).includes(event)) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
            }

            price += Events[event].priceInr;
        }


        // retrieve all users
        const users = await UserModel.find().select("+email +registeredEvents").exec();

        // loop through all users and match the userID with the hashed version
        let user;
        for await (const u of users) {
            const matchedUserID = await bcrypt.compare(u._id.toString(), hashedAuthUserID);
            if(matchedUserID) {
                user = u;
                break;
            }
        }

        // user not found
        if(!user) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User not authenticated!");
        }

        // check if user already registered in event
        const userRegisteredEvents = user.registeredEvents;
        for(const event in events) {
            if(userRegisteredEvents.includes(Number(event))) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
            }
        }

        // create new user with given data
        const newRegistration = await RegistrationModel.create({
            userID: user._id,
            department: department,
            year: year,
            events: events,
            totalPrice: price,
            paymentScreenshot: "To be implemented", // FIX : Implement
            confirmed: false,
        });

        // add new registrations to user
        user.registeredEvents = [...userRegisteredEvents, ...events];
        user.save();

        // additional info
        if(additionalInfo) {
            newRegistration.additionalInfo = additionalInfo;
            newRegistration.save();
        }

        res.status(httpCodes["201"].code);
        res.json({
            fullName: user.fullName,
            email: user.email,
            department: department,
            year: year,
            events: events,
            price: price,
            message: "Succesfully registered user to event."
        });

    } catch(error) {
        next(error);
    }
}
