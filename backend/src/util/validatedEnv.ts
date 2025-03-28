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

  // Cloudinary
  CDNY_CLOUD_NAME: str(),
  CDNY_API_KEY: str(),
  CDNY_API_SECRET: str(),

  // Nodemailer
  NDML_SERVICE: str(),
  NDML_SMTP: str(),
  NDML_PORT: num(),
  NDML_EMAIL: str(),
  NDML_PASSWORD: str(),

  // Resend
  RSND_FROM: str(),
  RSND_API_KEY: str(),

  // Logging
  PPTRL_HOST: str(),
  PPTRL_PORT: num(),
  PPTRL_PROTOCOL: str(),
  LOG_TO: str(),
  LOG_LEVEL: str(),
  LOG: bool(),
});
