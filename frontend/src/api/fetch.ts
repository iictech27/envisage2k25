import validatedEnv from "./utils/validatedEnv";

// import { ReqRegistrationBody, ResRegistrationBody } from "./bodies/registration";
import { ReqLoginBody, ReqSignupBody, ResUserBody } from "./bodies/user";
import { ResEventsBody } from "./bodies/events";
import { ResSSRegistrationBody } from "./bodies/registration_ss";
import { ReqEditReg, ReqGetReg, ResRegAdmin } from "./bodies/admin";

const reqTypes = {
  GET: "GET",
  POST: "POST",
};

const apiServerLink = validatedEnv.VITE_SERVER_LINK;

// send request to server and fetch data
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(apiServerLink + "/api" + input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// new registration
export async function newRegistration(
  formData: FormData
): Promise<ResSSRegistrationBody> {
  const response = await fetch(apiServerLink + "/api/reg/new", {
    method: reqTypes.POST,
    body: formData,
    credentials: "include",
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// check if server is online
export async function reqServerStatus() {
  const response = await fetchData("/", {
    method: reqTypes.GET,
    credentials: "include",
  });

  return response;
}

// send request to get events info
export async function reqEvents(): Promise<ResEventsBody> {
  const response = await fetchData("/events", {
    method: reqTypes.GET,
    credentials: "include",
  });

  return response.json();
}

// send request for let logged-in user info
export async function reqAuthUserData(): Promise<ResUserBody> {
  const response = await fetchData("/users/get", {
    method: reqTypes.GET,
    credentials: "include",
  });

  return response.json();
}

export async function reqNewUserSignIn(
  credentials: ReqSignupBody
): Promise<ResUserBody> {
  const response = await fetchData("/users/signup", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function verifyEmail(credentials: {
  otp: string;
}): Promise<ResUserBody> {
  const response = await fetchData("/users/veremail", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  return response.json();
}

// resend verification mail
export async function resendEmail() {
  const response = await fetchData("/users/resend", {
    method: reqTypes.POST,
    credentials: "include"
  });

  return response.json();
}

export async function reqUserLogIn(
  credentials: ReqLoginBody
): Promise<ResUserBody> {
  const response = await fetchData("/users/login", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function reqUserLogout() {
  console.log(await fetchData("/users/logout", {
    method: reqTypes.POST,
    credentials: "include"
  }));
}


export async function adminGetRegistraions(cred: ReqGetReg): Promise<ResRegAdmin> {
  const response = await fetchData("/admin/getreg", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cred),
  });

  return response.json();
}

export async function adminVerifyRegistration(cred: ReqEditReg) {
  console.log(await fetchData("/admin/verreg", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cred),
  }));
}

export async function adminRejectRegistration(cred: ReqEditReg) {
  console.log(await fetchData("/admin/rejreg", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cred),
  }));
}

export async function adminDeleteRegistration(cred: ReqEditReg) {
  console.log(await fetchData("/admin/delreg", {
    method: reqTypes.POST,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cred),
  }));
}
