import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const registrationSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    additionalInfo:{
        type: String
    }
}, {
    timestamps: true
});

type Registration = InferSchemaType<typeof registrationSchema>; // Create a Registration type based on the Schema
const RegistrationModel = model<Registration>(dbCollections.registrationsCollection, registrationSchema); // Create Registration model and define its Collection and Schema

export default RegistrationModel;
