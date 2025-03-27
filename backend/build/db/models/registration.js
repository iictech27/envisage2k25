import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
// create a scheme type to store razorpay orders inside the Registration schema
const orderSchema = new Schema({
    id: { type: String, required: true, unique: true },
    receipt: { type: String },
    amount: { type: Number, required: true },
    verified: { type: Boolean, required: true },
    createdAt: { type: Number, required: true },
});
const registrationSchema = new Schema({
    // user details
    userID: { type: Schema.Types.ObjectId, required: true },
    phone: { type: String, required: true },
    // college details
    department: { type: String, required: false },
    year: { type: Number, required: true },
    college: { type: String, required: true },
    eventIDs: { type: [Number], required: true },
    // registration payment details
    totalPrice: { type: Number, requried: true },
    paymentID: { type: String, default: "" },
    order: { type: orderSchema, required: true, unique: true },
    additionalInfo: { type: String }
}, {
    timestamps: true
});
const RegistrationModel = model(dbCollections.registrationsCollection, registrationSchema);
export default RegistrationModel;
