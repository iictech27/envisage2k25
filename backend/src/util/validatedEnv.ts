import "@dotenvx/dotenvx/config";
import { bool, cleanEnv, port, str, num } from "envalid";

export default cleanEnv(process.env, {
    // Database
    MONGO_CONNECTION_STR: str(),

    // Server
    PORT: port(),
    HASH_NUM: num(),
    CLIENT_LINK: str(),

    // Sessions
    SESSION_SECRET: str(),
    SESSION_EXP_MIN_M: num(),
    SESSION_EXP_MAX_HR: num(),

    // Razorpay
    RZP_KEY_ID: str(),
    RZP_KEY_SECRET: str(),

    // Others
    LOG: bool(),
});
