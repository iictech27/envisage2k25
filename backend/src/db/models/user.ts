import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const userSchema = new Schema({
    fullName:           { type: String,                  required: true                                           },
    email:              { type: String,                  required: true, unique: true, select: false              },
    hashedPassword:     { type: String,                  required: true,               select: false              },
    registeredEventIDs: { type: [Number],                required: true, unique: true, select: false, default: [] },
    registrationIDs:    { type: [Schema.Types.ObjectId], required: true ,                             default: [] }
}, {
    timestamps: true
});

type User = InferSchemaType<typeof userSchema>; // Create a User type based on the Schema
const UserModel = model<User>(dbCollections.usersCollection, userSchema); // Create User model and define its Collection and Schema

export default UserModel;
