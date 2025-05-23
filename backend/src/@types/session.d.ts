import mongoose from "mongoose";

declare module "express-session" {
    interface SessionData {
        sessionToken: mongoose.Types.ObjectId;
    }
}
