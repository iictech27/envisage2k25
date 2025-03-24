import { connectDB } from "./db/db.js";
import startServer from "./server/server.js";

connectDB();
startServer();
