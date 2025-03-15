import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

type User = InferSchemaType<typeof userSchema>;                                  // Create a User type based on the Schema
const UserModel = model<User>(dbCollections.usersCollection, userSchema);        // Create User model and define its Collection and Schema

export default UserModel;
