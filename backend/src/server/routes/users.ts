import { Router } from "express";

import { requireAuthUser, requireUnauthUser } from "../middleware/user.js";
import { getAuthUser, getRegEvents, logIn, logOut, signUp } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/users/get", requireAuthUser, getAuthUser);
usersRouter.get("/users/regevnt", requireAuthUser, getRegEvents);
usersRouter.post("/users/signup", requireUnauthUser, signUp);
usersRouter.post("/users/login", requireUnauthUser, logIn);
usersRouter.post("/users/logout", logOut);

export default usersRouter;
