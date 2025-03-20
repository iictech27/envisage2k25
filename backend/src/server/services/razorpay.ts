import Razorpay from "razorpay";
import validatedEnv from "../../util/validatedEnv.js";

export const rzpInstance = new Razorpay({
    key_id: validatedEnv.RZP_KEY_ID,
    key_secret: validatedEnv.RZP_KEY_SECRET
});
