import { Resend } from "resend";
import validatedEnv from "../../util/validatedEnv.js";

const resend = new Resend(validatedEnv.RSND_API_KEY);

export default resend;
