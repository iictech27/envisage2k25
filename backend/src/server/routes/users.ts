import { Router } from "express";

import { getAuthenticatedUser, logIn, logOut, signUp } from "../controllers/users.js";
import { requireAuthUser, requireUnauthUser } from "../middleware/user.js";

const usersRouter = Router();

usersRouter.get("/users/get", requireAuthUser, getAuthenticatedUser);
usersRouter.post("/users/signup", requireUnauthUser, signUp);
usersRouter.post("/users/login", requireUnauthUser, logIn);
usersRouter.post("/users/logout", logOut);

export default usersRouter;
