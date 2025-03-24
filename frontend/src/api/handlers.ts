/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReqLoginBody, ReqSignupBody, ResUserBody } from "./bodies/user";
// import { isResError } from "./bodies/errors";
import {
  getRegistrations,
  reqAuthUserData,
  reqNewUserSignIn,
  reqServerStatus,
  reqUserLogIn,
  reqUserLogout,
} from "./fetch";

export async function canConnectToServer(): Promise<boolean> {
  try {
    await reqServerStatus();
    return true;
  } catch (error) {
    return false;
  }
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const body = await reqAuthUserData();
    return body != null;
  } catch (error) {
    return false;
  }
}

export async function getAuthUser(): Promise<ResUserBody | string> {
  try {
    const body = await reqAuthUserData();
    return body;
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function signUpUser(
  creds: ReqSignupBody
): Promise<ResUserBody | string> {
  try {
    const body = await reqNewUserSignIn(creds);
    return body;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function logInUser(
  creds: ReqLoginBody
): Promise<ResUserBody | string> {
  try {
    const body = await reqUserLogIn(creds);
    return body;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function logOutUser(): Promise<boolean> {
  try {
    await reqUserLogout();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error has occured";
}

export async function getRegData(): Promise<any> {
  try {
    const body = await getRegistrations();
    return body;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}
