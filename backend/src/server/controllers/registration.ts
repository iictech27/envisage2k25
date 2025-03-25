import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Orders } from "razorpay/dist/types/orders.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

import RegistrationModel from "../../db/models/registration.js";
import { Events } from "../../util/events.js";
import UserModel from "../../db/models/user.js";
import { httpCodes } from "../../util/httpCodes.js";
import {
  ReqRegistrationOrderBody,
  ReqRegistrationVerifyBody,
  ResRegistrationVerifiedBody,
  ResRegistrationOrderBody,
} from "../bodies/registration.js";
import rzpInstance from "../services/razorpay.js";
import validatedEnv from "../../util/validatedEnv.js";

// endpoint to create a registration
export const verifyRegistrationOrder: RequestHandler<
  unknown,
  unknown,
  ReqRegistrationVerifyBody,
  unknown
> = async (req, res, next) => {
  const rzpOrderID = req.body.rzpOrderID;
  const rzpPaymentID = req.body.rzpPaymentID;
  const rzpSignature = req.body.rzpSignature;

  try {
    // make sure all parameters are received
    if (!rzpOrderID || !rzpPaymentID || !rzpSignature) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // retrieve registration
    const registration = await RegistrationModel.findOne({
      order: { id: rzpOrderID },
    }).exec();

    if (!registration) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message +
          ": No registration corresponding to payment order!"
      );
    }

    // razorpay sha256 encrypts the paymentID and orderID into a signature by encrypting the
    // parameters and comparing with the provided signature we can verify the validity of the payment
    // https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#15-verify-payment-signature
    if (
      !validatePaymentVerification(
        { order_id: rzpOrderID, payment_id: rzpPaymentID },
        rzpSignature,
        validatedEnv.RZP_KEY_SECRET
      )
    ) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Invalid payment credentials!"
      );
    }

    // make registration verified
    registration.order.verified = true;
    registration.paymentID = rzpPaymentID;
    registration.save();

    // retrieve authenticated user
    const user = await UserModel.findById(req.session.sessionToken).exec();

    // create response
    const response: ResRegistrationVerifiedBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      userFullName: user!.fullName,
      userYear: registration.year,
      userEmail: user!.email,
      userPhone: registration.phone,
      userCollege: registration.college,
      newRegisteredEventIDs: registration.eventIDs,
      paymentID: rzpPaymentID,
      price: registration.order.amount,
      details: "Successfully registered user to event(s)!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createRegistrationOrder: RequestHandler<
  unknown,
  unknown,
  ReqRegistrationOrderBody,
  unknown
> = async (req, res, next) => {
  const department = req.body.department?.trim();
  const year = req.body.year;
  const phone = req.body.phone?.trim();
  const college = req.body.college?.trim();
  const eventIDs = req.body.eventIDs;
  const additionalInfo = req.body.additionalInfo?.trim();

  try {
    // make sure all parameters are received
    if (!department || !year || !eventIDs || !phone || !college) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Parameters missing!"
      );
    }

    // validate year
    if (year != 1 && year != 2 && year != 3 && year != 4) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message + ": Enter valid year!"
      );
    }

    // phone number validation
    if (!/^[6-9]{1}[0-9]{9}$/.test(phone)) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Enter a valid 10 digit phone number without country code!"
      );
    }

    // make sure no duplicate events are present
    if (new Set(eventIDs).size != eventIDs.length) {
      throw createHttpError(
        httpCodes["401"].code,
        httpCodes["401"].message +
          ": Registration requested for duplicate events!"
      );
    }

    // make sure events are valid and calculate price
    let price = 0;
    let receipt = ""; // add event indexes to receipt id
    for (let i = 0; i < eventIDs.length; i++) {
      // filter events with id (should return only one)
      const event = Events.filter((event) => event.id == eventIDs[i]);

      // check if the eventID exists in list
      if (event.length <= 0) {
        throw createHttpError(
          httpCodes["401"].code,
          httpCodes["401"].message +
            ": Registration requested for invalid events!"
        );
      }

      // NOTE : Should never happen (setup the event array properly)
      // check only one event is returned
      if (event.length > 1) {
        throw createHttpError(
          httpCodes["500"].code,
          httpCodes["500"].message + ": Server error! Sorry, working on it!"
        );
      }

      price += event[0].fee;
      receipt += (receipt == "" ? "" : "-") + event[0].id;
    }

    // retrieve authenticated user
    const user = await UserModel.findById(req.session.sessionToken).exec();

    // add as many characters of user id (from the end) to receipt as we can
    const userID = user!._id.toString();
    receipt =
      userID.substring(userID.length - 40 + receipt.length, userID.length + 1) +
      " [" +
      receipt +
      "]";

    // check if user already registered in event
    const userRegisteredEventIDs = user!.registeredEventIDs; // user will definitely exist as checked by middleware
    for (let i = 0; i < eventIDs.length; i++) {
      if (userRegisteredEventIDs.includes(Number(eventIDs[i]))) {
        throw createHttpError(
          httpCodes["401"].code,
          httpCodes["401"].message +
            ": User already registered in one or more events!"
        );
      }
    }

    // set razorpay order options - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#122-request-parameters
    const orderOptions: Orders.RazorpayOrderCreateRequestBody = {
      amount: price * 100, // NOTE : Should be in paise
      currency: "INR",
      receipt: receipt,
      notes: {
        userID: user!._id.toString(),
        userFullName: user!.fullName,
        userEmail: user!.email,
      },
      partial_payment: false,
    };

    // create the razorpay order - https://razorpay.com/docs/api/orders/entity/
    const order: Orders.RazorpayOrder = await rzpInstance.orders.create(
      orderOptions
    );

    // create new user with given data
    const newRegistration = await RegistrationModel.create({
      userID: user!._id,
      department: department,
      year: year,
      phone: phone,
      college: college,
      eventIDs: eventIDs,
      totalPrice: order.amount,
      order: {
        id: order.id,
        receipt: order.receipt,
        amount: order.amount,
        verified: false,
        createdAt: order.created_at,
      },
    });

    // additional info
    if (additionalInfo) {
      newRegistration.additionalInfo = additionalInfo;
      newRegistration.save();
    }

    // add new registrations to user
    user!.registeredEventIDs = [...userRegisteredEventIDs, ...eventIDs];
    user!.registrationIDs = [
      ...user!.registrationIDs,
      ...[newRegistration._id],
    ];
    user!.save();

    const response: ResRegistrationOrderBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      userFullName: user!.fullName,
      userEmail: user!.email,
      price: price,
      order: order,
      details: "Successfully created payment order!",
    };

    res.status(response.status);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
