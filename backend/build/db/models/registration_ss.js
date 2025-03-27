import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
const registrationSchema = new Schema({
    // user details
    userID: { type: Schema.Types.ObjectId, required: false },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    // college details
    department: { type: String, required: false },
    year: { type: Number, required: true },
    college: { type: String, required: true },
    eventIDs: { type: [Number], required: true },
    // registration payment details
    totalPrice: { type: Number, requried: true },
    paymentSSUrl: { type: String, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    additionalInfo: { type: String },
    // NOTE : Currently we are calculating a date 7 days after a registration is
    // rejected and updating expireAt with it... we should be able to use "expires"
    // with a time of 7 days but it doesnt seem to work??
    // DOCS from MongoDB (for reference) : https://www.mongodb.com/docs/manual/core/index-ttl/
    //                                     https://www.mongodb.com/docs/manual/tutorial/expire-data/
    // DOCS from Mongoose (in use) : https://mongoosejs.com/docs/api/schemadateoptions.html#example
    // WARN : Works fine in locally hosted mongo instances, but can show weird behaviour in 
    // cloud/atlas mongo instances. TTL requests are probably batched in their backend causing
    // a significant delay between provided timestamp and actual deletion.
    // WARN : Special field for TTL - Do not changed unless needed
    expireAt: {
        type: Date,
        required: false,
        default: null,
        // expires: 604800, // 7 days = (7 * 24 * 60 * 60) seconds = 604800 seconds
    },
}, {
    timestamps: true,
    // NOTE : According to https://www.mongodb.com/docs/manual/core/index-ttl/,
    // since mongoDB 7.0 "partial TTL indexes" can be created by making the
    // collected a "time series collection"... making this a time series collection
    // just in case
    //
    // https://mongoosejs.com/docs/guide.html#timeseries
    timeseries: {
        timeField: "expireAt",
        granularity: "hours"
    }
});
const SSRegistrationModel = model(dbCollections.registrationsSSCollection, registrationSchema);
export default SSRegistrationModel;
