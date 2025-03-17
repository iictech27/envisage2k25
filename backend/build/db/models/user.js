import { model, Schema } from "mongoose";
import dbCollections from "../collections.js";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    registeredEventIDs: {
        type: [Number], // events array
        unique: true,
        select: false
    }
}, {
    timestamps: true
});
const UserModel = model(dbCollections.usersCollection, userSchema); // Create User model and define its Collection and Schema
export default UserModel;
