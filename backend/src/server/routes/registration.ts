import { Router } from "express";

import { createRegistration } from "../controllers/registration.js";
import { requireAuthUser } from "../middleware/user.js";

const registrationRouter = Router();

registrationRouter.post("/reg/new", requireAuthUser, createRegistration); // new registration

export default registrationRouter;
