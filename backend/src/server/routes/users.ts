import { Router } from "express";

import { getAuthenticatedUser, logIn, logOut, signUp } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/users/get", getAuthenticatedUser);
usersRouter.post("/users/signup", signUp);
usersRouter.post("/users/login", logIn);
usersRouter.post("/users/logout", logOut);

export default usersRouter;
