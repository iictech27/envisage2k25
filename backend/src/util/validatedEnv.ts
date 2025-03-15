import "@dotenvx/dotenvx/config";
import { bool, cleanEnv, port, str, num } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STR: str(),
    PORT: port(),
    LOG: bool(),
    SESSION_SECRET: str(),
    HASH_NUM: num()
});
