import { Router } from "express";

import { requireAuthUser } from "../middleware/user.js";
import { createRegistrationOrder, verifyRegistrationOrder } from "../controllers/registration.js";

const registrationRouter = Router();

registrationRouter.post("/reg/new", requireAuthUser, createRegistrationOrder);
registrationRouter.post("/reg/verify", requireAuthUser, verifyRegistrationOrder);

export default registrationRouter;
