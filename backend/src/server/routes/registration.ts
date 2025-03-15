import { Router } from "express";
import { getRegistrations } from "../controllers/registration.js";

const registrationRouter = Router();

registrationRouter.get("/reg/", getRegistrations);

export default registrationRouter;
