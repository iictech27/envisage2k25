import mongoose from "mongoose";

import validatedEnv from "../util/validatedEnv.js";
import { logInfo, logErr } from "../util/logger.js";
import MongoStore from "connect-mongo";

const mongoStr = validatedEnv.MONGO_CONNECTION_STR;
const mongoStore = MongoStore.create({ mongoUrl: mongoStr });

function connectDB() : void {

    // connect to the mongo db instance
    mongoose.connect(mongoStr)
        .then(() => {
            logInfo("Connected to DB at " + mongoStr);
        })
        .catch((error) => {
            logErr("Error while connecting to db:", "db.ts");
            logErr(error);
        });

}

export { connectDB, mongoStore };
