import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const registrationSchema = new Schema(
  {
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

    additionalInfo: { type: String },
  },
  {
    timestamps: true,
  }
);

type SSRegistration = InferSchemaType<typeof registrationSchema>;
const SSRegistrationModel = model<SSRegistration>(
  dbCollections.registrationsSSCollection,
  registrationSchema
);

export default SSRegistrationModel;
