import Razorpay from "razorpay";
import { createHmac } from "node:crypto";

import validatedEnv from "../../util/validatedEnv.js";

// initalize the razorpay instance
const rzpInstance = new Razorpay({
    key_id: validatedEnv.RZP_KEY_ID,
    key_secret: validatedEnv.RZP_KEY_SECRET
});

export default rzpInstance;
