import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
const registrationSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    eventIDs: {
        type: [Number], // event enum number array
        required: true
    },
    totalPrice: {
        type: Number,
        requried: true
    },
    // FIX : Figure out
    paymentScreenshot: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    additionalInfo: {
        type: String
    }
}, {
    timestamps: true
});
const RegistrationModel = model(dbCollections.registrationsCollection, registrationSchema); // Create Registration model and define its Collection and Schema
export default RegistrationModel;
