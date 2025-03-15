import { InferSchemaType, model, Schema } from "mongoose";

import dbCollections from "../collections.js";

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    rulebookUrl: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

type Event = InferSchemaType<typeof eventSchema>; // Create a Event type based on the Schema
const EventModel = model<Event>(dbCollections.eventsCollection, eventSchema); // Create Event model and define its Collection and Schema

export default EventModel;
