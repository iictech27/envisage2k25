import { ReqSSRegistrationOrderBody, ResSSRegistrationBody } from "./bodies/registration_ss";
import { ReqLoginBody, ReqSignupBody, ResUserBody } from "./bodies/user";
// import { isResError } from "./bodies/errors";
import { newRegistration, reqAuthUserData, reqNewUserSignIn, reqServerStatus, reqUserLogIn, reqUserLogout } from "./fetch";

export async function canConnectToServer(): Promise<boolean> {
  try {
    await reqServerStatus();
    return true;
  } catch(error) {
    return false;
  }
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {

    const body = await reqAuthUserData();
    return body != null;

  } catch(error) {
    return false;
  }
}

export async function getAuthUser(): Promise<ResUserBody | string> {
  try {

    const body = await reqAuthUserData();
    return body;

  } catch(error) {
    return getErrorMessage(error);
  }
}

export async function signUpUser(creds: ReqSignupBody): Promise<ResUserBody | string> {
  try {

    const body = await reqNewUserSignIn(creds);
    return body;

  } catch(error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function newReg(fields: ReqSSRegistrationOrderBody, image: File): Promise<ResSSRegistrationBody | string> {
  try {
    const formData = new FormData();

    formData.append("fullName", fields.fullName);
    formData.append("email", fields.email);
    formData.append("year", fields.year.toString());
    formData.append("college", fields.college);
    formData.append("phone", fields.phone);
    formData.append("image", image);
    if(fields.additionalInfo) formData.append("additionalInfo", fields.additionalInfo);

    const response = await newRegistration(formData);
    return response;

  } catch(error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function logInUser(creds: ReqLoginBody): Promise<ResUserBody | string> {
  try {

    const body = await reqUserLogIn(creds);
    return body;

  } catch(error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function logOutUser(): Promise<boolean> {
  try {
    await reqUserLogout();
    return true;
  } catch(error) {
    console.log(error);
    return false;
  }
}

function getErrorMessage(error: unknown): string {
  if(error instanceof Error) {
    return error.message;
  }

  return "An unknown error has occured";
}
