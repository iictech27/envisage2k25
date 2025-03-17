import "@dotenvx/dotenvx/config";
import { bool, cleanEnv, port, str, num } from "envalid";
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STR: str(),
    PORT: port(),
    LOG: bool(),
    SESSION_SECRET: str(),
    HASH_NUM: num(),
    CLIENT_LINK: str(),
    SESSION_EXP_MIN_M: num(),
    SESSION_EXP_MAX_HR: num()
});
