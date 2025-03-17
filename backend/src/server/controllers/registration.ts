import { RequestHandler } from "express";
import createHttpError from "http-errors";

import RegistrationModel from "../../db/models/registration.js";
import httpCodes from "../../util/httpCodes.js";
import { RegistrationBody } from "../requestBodies/registration.js";
import { Events, EventsEnum } from "../../util/eventsEnum.js";
import UserModel from "../../db/models/user.js";
import { ReturnedRegistrationBody } from "../responseBodies/registration.js";

// endpoint to create a registration
export const createRegistration: RequestHandler<unknown, unknown, RegistrationBody, unknown> = async (req, res, next) => {
    const department = req.body.department?.trim();
    const year = req.body.year;
    const events = req.body.events;
    const additionalInfo = req.body.additionalInfo?.trim();

    try {

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

        // make sure events are valid and calculate price
        let price = 0;
        for(const event in events) {
            if(!Object.values(EventsEnum).includes(event)) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
            }

            price += Events[event].priceInr;
        }

        // retrieve authenticated user
        const user = await UserModel.findById(req.session.sessionToken).select("+email +registeredEvents").exec();

        // check if user already registered in event
        const userRegisteredEvents = user!.registeredEvents; // user will definitely exist as checked by middleware
        for(const event in events) {
            if(userRegisteredEvents.includes(Number(event))) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Invalid parameters!");
            }
        }

        // create new user with given data
        const newRegistration = await RegistrationModel.create({
            userID: user!._id,
            department: department,
            year: year,
            events: events,
            totalPrice: price,
            paymentScreenshot: "To be implemented", // FIX : Implement
            confirmed: false,
        });

        // additional info
        if(additionalInfo) {
            newRegistration.additionalInfo = additionalInfo;
            newRegistration.save();
        }

        // add new registrations to user
        user!.registeredEvents = [...userRegisteredEvents, ...events];
        user!.save();

        // create response
        const response: ReturnedRegistrationBody = {
            status: httpCodes["201"].code,
            message: httpCodes["201"].message,
            userFullName: user!.fullName,
            userDept: department,
            userYear: year,
            userEmail: user!.email,
            userRegisteredEvents:events,
            price: price,
            details: "Successfully registered user to event(s)!"
        }

        res.status(response.status);
        res.json(response);

    } catch(error) {
        next(error);
    }
}
