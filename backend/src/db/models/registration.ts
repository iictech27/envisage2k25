import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

// create a scheme type to store razorpay orders
const orderSchema = new Schema({
    id:          { type: String,                       required: true, unique: true },
    receipt:     { type: String                                                     },
    amount:      { type: Number,                       required: true               },
    verified:    { type: Boolean,                      required: true               },
    createdAt:   { type: Number,                       required: true               },
});

const registrationSchema = new Schema({
    userID:         { type: Schema.Types.ObjectId, required: true                            },
    department:     { type: String,                required: true                            },
    year:           { type: Number,                required: true                            },
    phone:          { type: String,                required: true                            },
    college:        { type: String,                required: true                            },
    eventIDs:       { type: [Number],              required: true                            },
    totalPrice:     { type: Number,                requried: true                            },
    paymentID:      { type: String,                                              default: "" },
    order:          { type: orderSchema,           required: true, unique: true              },
    additionalInfo: { type: String                                                           }
}, {
    timestamps: true
});

type Registration = InferSchemaType<typeof registrationSchema>; // Create a Registration type based on the Schema
const RegistrationModel = model<Registration>(dbCollections.registrationsCollection, registrationSchema); // Create Registration model and define its Collection and Schema

export default RegistrationModel;
