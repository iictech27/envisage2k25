import { Router } from "express";
import { createRegistration } from "../controllers/registration.js";

const registrationRouter = Router();

registrationRouter.get("/reg/new", createRegistration);

export default registrationRouter;
