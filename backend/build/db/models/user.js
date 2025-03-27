import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
const userSchema = new Schema({
    // user details
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    hashedPassword: { type: String, required: true, },
    // email verification
    // registration details
    registeredEventIDs: { type: [Number], required: true, default: [] },
    registrationIDs: { type: [Schema.Types.ObjectId], required: true, default: [] },
    pendingRegIDs: { type: [Schema.Types.ObjectId], required: true, default: [] },
    rejectedRegIDs: { type: [Schema.Types.ObjectId], required: true, default: [] }
}, {
    timestamps: true
});
const UserModel = model(dbCollections.usersCollection, userSchema);
export default UserModel;
