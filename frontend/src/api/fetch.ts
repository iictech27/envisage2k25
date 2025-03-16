import validatedEnv from "./validatedEnv";

import { ReturnedUserBody } from "./responseBodies/user";
import { UserSignInCredBody, UserLogInCredBody } from "./requestBodies/user";

const reqTypes = {
  GET: "GET",
  POST: "POST",
}

const apiServerLink = import.meta.env.VITE_SERVER_LINK;

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(apiServerLink + "/api" + input, init);

  if(response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// user api connections
export async function getLoggedInUser(): Promise<ReturnedUserBody> {
  const response = await fetchData("/users/get", {
    method: reqTypes.GET,
    credentials: "include"
  });
  return response.json();
}

export async function postUserSignIn(credentials: UserSignInCredBody): Promise<ReturnedUserBody> {
  const response = await fetchData("/users/signup", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  return response.json();
}

export async function postUserLogIn(credentials: UserLogInCredBody): Promise<ReturnedUserBody> {
  const response = await fetchData("/users/login", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  return response.json();
}

export async function postUserLogOut() {
  await fetchData("/users/logout", { method: reqTypes.POST });
}
