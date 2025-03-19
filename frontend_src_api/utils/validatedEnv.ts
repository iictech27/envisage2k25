import { cleanEnv, str } from "envalid";

export default cleanEnv(import.meta.env, {
  VITE_SERVER_LINK: str()
});
