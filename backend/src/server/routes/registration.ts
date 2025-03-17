import { Router } from "express";

import { createRegistration, getUserRegistrations } from "../controllers/registration.js";
import { requireAuthUser } from "../middleware/user.js";

const registrationRouter = Router();

registrationRouter.get("/reg/new", requireAuthUser, createRegistration);
registrationRouter.get("/reg/user", requireAuthUser, getUserRegistrations);

export default registrationRouter;
