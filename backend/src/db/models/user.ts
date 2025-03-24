import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const userSchema = new Schema({
    // user details
    fullName:           { type: String,                  required: true                                           },
    email:              { type: String,                  required: true, unique: true, select: false              },
    hashedPassword:     { type: String,                  required: true,               select: false              },

    // email verification

    // registration details
    registeredEventIDs: { type: [Number],                required: true,               select: false, default: [] },
    registrationIDs:    { type: [Schema.Types.ObjectId], required: true ,              select: false, default: [] }
}, {
    timestamps: true
});

type User = InferSchemaType<typeof userSchema>;
const UserModel = model<User>(dbCollections.usersCollection, userSchema);

export default UserModel;
