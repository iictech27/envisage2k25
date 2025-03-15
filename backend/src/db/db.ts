import mongoose from "mongoose";

import validatedEnv from "../util/validatedEnv.js";
import { log, logErr } from "../util/logger.js";

const mongo_str = validatedEnv.MONGO_CONNECTION_STR;

function connectDB() : void {

    // connect to the mongo db instance
    mongoose.connect(mongo_str)
        .then(() => {
            log("Connected to DB at " + mongo_str);
        })
        .catch((error) => {
            logErr("Error while connecting to db:", "db.ts");
            logErr(error);
        });

}

export { connectDB };
