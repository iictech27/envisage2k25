import { Router } from "express";
import { getServerStatus } from "../controllers/root.js";

const rootRouter = Router();

rootRouter.get("/", getServerStatus);

export default rootRouter;
