import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import validatedEnv from "../util/validatedEnv.js";
import { log, logErr } from "../util/logger.js";

const mongoStr = validatedEnv.MONGO_CONNECTION_STR;
export const mongoStore = MongoStore.create({ mongoUrl: mongoStr }); // session store

export default function connectDB() : void {

    // connect to the mongo db instance
    mongoose.connect(mongoStr)
        .then(() => {
            log("Connected to DB at " + mongoStr);
        })
        .catch((error) => {
            logErr("Error while connecting to db:");
            logErr(error);
        });

}
