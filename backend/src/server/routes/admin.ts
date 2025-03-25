import { Router } from "express";
import { deleteRegistration, getRegistrations, rejectRegistration, verifyRegistration } from "../controllers/admin.js";
import { requireAdmin } from "../middleware/admin.js";

const adminRouter = Router();

adminRouter.post("/admin/getreg", requireAdmin, getRegistrations);
adminRouter.post("/admin/verreg", requireAdmin, verifyRegistration);
adminRouter.post("/admin/rejreg", requireAdmin, rejectRegistration);
adminRouter.post("/admin/delreg", requireAdmin, deleteRegistration);

export default adminRouter;
