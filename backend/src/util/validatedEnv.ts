import "@dotenvx/dotenvx/config";
import { bool, cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STR: str(),
    PORT: port(),
    LOG: bool()
});
