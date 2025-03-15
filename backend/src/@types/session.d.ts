import mongoose from "mongoose";

declare module "express-session" {
    interface SessionData {
        hashedUserID: string;
    }
}
