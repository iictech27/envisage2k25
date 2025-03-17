import createHttpError from "http-errors";
import RegistrationModel from "../../db/models/registration.js";
import httpCodes from "../../util/httpCodes.js";
import UserModel from "../../db/models/user.js";
import { Events } from "../../util/events.js";
// endpoint to create a registration
export const createRegistration = async (req, res, next) => {
    const department = req.body.department?.trim();
    const year = req.body.year;
    const eventIDs = req.body.eventIDs;
    const additionalInfo = req.body.additionalInfo?.trim();
    try {
        // make sure all parameters are received
        if (!department || !year || !eventIDs) {
            throw createHttpError(httpCodes["400"].code, httpCodes["400"].message + ": Parameters missing!");
        }
        // validate year
        if (year != 1 && year != 2 && year != 3 && year != 4) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Enter valid year!");
        }
        // make sure no duplicate events are present
        if (new Set(eventIDs).size != eventIDs.length) {
            throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Registration requested for duplicate events!");
        }
        // make sure events are valid and calculate price
        let price = 0;
        for (const eventID in eventIDs) {
            // filter events with id (should return only one)
            const event = Events.filter((event) => event.id.toString() == eventID);
            // check if the eventID exists in list
            if (event.length <= 0) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": Registration requested for invalid events!");
            }
            // check only one event is returned
            if (event.length > 1) {
                throw createHttpError(httpCodes["500"].code, httpCodes["500"].message + ": Server error! Sorry, working on it!");
            }
            price += event[0].fee;
        }
        // retrieve authenticated user
        const user = await UserModel.findById(req.session.sessionToken).select("+email +registeredEventIDs").exec();
        // check if user already registered in event
        const userRegisteredEventIDs = user.registeredEventIDs; // user will definitely exist as checked by middleware
        for (const event in eventIDs) {
            if (userRegisteredEventIDs.includes(Number(event))) {
                throw createHttpError(httpCodes["401"].code, httpCodes["401"].message + ": User already registered in one or more events!");
            }
        }
        // create new user with given data
        const newRegistration = await RegistrationModel.create({
            userID: user._id,
            department: department,
            year: year,
            eventIDs: eventIDs,
            totalPrice: price,
            paymentScreenshot: "To be implemented", // FIX : Implement
            confirmed: false,
        });
        // additional info
        if (additionalInfo) {
            newRegistration.additionalInfo = additionalInfo;
            newRegistration.save();
        }
        // add new registrations to user
        user.registeredEventIDs = [...userRegisteredEventIDs, ...eventIDs];
        user.save();
        // create response
        const response = {
            status: httpCodes["201"].code,
            message: httpCodes["201"].message,
            userFullName: user.fullName,
            userDept: department,
            userYear: year,
            userEmail: user.email,
            userRegisteredEventIDs: eventIDs,
            price: price,
            details: "Successfully registered user to event(s)!"
        };
        res.status(response.status);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
// endpoint to get registrations of a user
export const getUserRegistrations = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.sessionToken).select("+registeredEventIDs").exec();
        let events = [];
        // user will definitely exist from middleware
        for (const eventID in user.registeredEventIDs) {
            // filter events with id (should return only one)
            const event = Events.filter((event) => event.id.toString() == eventID);
            // check only one event is returned
            if (event.length > 1) {
                throw createHttpError(httpCodes["500"].code, httpCodes["500"].message + ": Server error! Sorry, working on it!");
            }
            events.push(event[0]);
        }
        const response = {
            status: httpCodes["201"].code,
            message: httpCodes["201"].message,
            events: events,
            details: "Successfully retrieved user registrations!"
        };
        res.status(response.status);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
