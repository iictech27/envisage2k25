import { Router } from "express";

// import { requireAuthUser } from "../middleware/user.js";
// import { createRegistrationOrder, verifyRegistrationOrder } from "../controllers/registration.js";
import {
  createRegistration,
} from "../controllers/registration_ss.js";
import upload from "../middleware/multer.js";

const registrationRouter = Router();

// registrationRouter.post("/reg/new", requireAuthUser, createRegistrationOrder);
// registrationRouter.post("/reg/verify", requireAuthUser, verifyRegistrationOrder);
registrationRouter.post("/reg/new", upload.single("image"), createRegistration);

export default registrationRouter;
