import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
const userSchema = new Schema({
    // user details
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    // email verification
    hashedOtp: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true },
    otpRegenAt: { type: Date, required: true },
}, {
    timestamps: true,
});
const UnverifiedUserModel = model(dbCollections.unverifiedUsersCollection, userSchema);
export default UnverifiedUserModel;
