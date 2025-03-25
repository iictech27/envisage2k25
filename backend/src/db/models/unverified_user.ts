import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const userSchema = new Schema({
    // user details
    fullName:           { type: String,                  required: true                                           },
    email:              { type: String,                  required: true, unique: true              },
    hashedPassword:     { type: String,                  required: true,                           },

    // email verification
    hashedOtp:          { type: String,                  required: true,                                          },
    otpExpiresAt:       { type: Date,                    required: true,                                          },
    otpRegenAt:         { type: Date,                    required: true,                                          }
}, {
    timestamps: true
});

type UnverifiedUser = InferSchemaType<typeof userSchema>;
const UnverifiedUserModel = model<UnverifiedUser>(dbCollections.unverifiedUsersCollection, userSchema);

export default UnverifiedUserModel;
