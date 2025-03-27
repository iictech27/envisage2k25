/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Event, Registration } from "../components/admin/RegistrationList";
import { eventOptions } from "../components/RegisterWithUPI";
import {
  ReqSSRegistrationOrderBody,
  ResSSRegistrationBody,
} from "./bodies/registration_ss";
import { ReqEmailVeriBody, ReqLoginBody, ReqResendEmailBody, ReqSignupBody, ResUserBody, ResUserSignupBody } from "./bodies/user";
// import { isResError } from "./bodies/errors";
import {
  adminDeleteRegistration,
  adminGetRegistraions,
  adminRejectRegistration,
  adminVerifyRegistration,
  newRegistration,
  reqAuthUserData,
  reqNewUserSignIn,
  reqServerStatus,
  reqUserLogIn,
  reqUserLogout,
  resendEmail,
  verifyEmail,
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
): Promise<ResUserSignupBody | string> {
  try {
    const body = await reqNewUserSignIn(creds);
    return body;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function newReg(
  fields: ReqSSRegistrationOrderBody,
  image: File
): Promise<ResSSRegistrationBody | string> {
  try {
    const formData = new FormData();

    formData.append("fullName", fields.fullName);
    formData.append("email", fields.email);
    formData.append("year", fields.year.toString());
    formData.append("college", fields.college);
    formData.append("phone", fields.phone);
    formData.append("image", image);
    if (fields.additionalInfo)
      formData.append("additionalInfo", fields.additionalInfo);

    const response = await newRegistration(formData);
    return response;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function verifyUserEmail(creds: ReqEmailVeriBody): Promise<any> {
  try {
    const body = await verifyEmail(creds);
    return body;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}

export async function resendMail(creds: ReqResendEmailBody): Promise<any> {
  try {
    const body = await resendEmail(creds);
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

export async function getReg(): Promise<Registration[]> {
  try {
    const response = await adminGetRegistraions({
      adminName: "admin_envisage",
      adminPassword: "@tmsltechies",
    });

    let registrations: Registration[] = [];
    let resRegsitrations = response.registrations;

    for (let i = 0; i < resRegsitrations.length; i++) {
      let events: Event[] = [];
      for (let j = 0; j < resRegsitrations[i].events.length; j++) {
        let event = eventOptions.filter(
          (event) => event.id == resRegsitrations[i].events[j]
        )[0];
        events.push({
          name: event.name,
          type: event.mode,
        });
      }

      registrations.push({
        regID: resRegsitrations[i].regID,
        email: resRegsitrations[i].email,
        fullname: resRegsitrations[i].fullname,
        events: events,
        paymentProof: resRegsitrations[i].paymentProof,
        verified: resRegsitrations[i].verified,
        rejected: resRegsitrations[i].rejected,
        totalPrice: resRegsitrations[i].totalPrice,
        phone: resRegsitrations[i].phone,
        year: resRegsitrations[i].year,
        college: resRegsitrations[i].college,
      });
    }

    return registrations;
  } catch (error) {
    console.log(error);
    alert(getErrorMessage(error));
    return [];
  }
}

export async function verifyReg(regID: string): Promise<boolean> {
  try {
    await adminVerifyRegistration({
      adminName: "admin_envisage",
      adminPassword: "@tmsltechies",
      regID: regID,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function rejectReg(regID: string): Promise<boolean> {
  try {
    await adminRejectRegistration({
      adminName: "admin_envisage",
      adminPassword: "@tmsltechies",
      regID: regID,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteReg(regID: string): Promise<boolean> {
  try {
    await adminDeleteRegistration({
      adminName: "admin_envisage",
      adminPassword: "@tmsltechies",
      regID: regID,
    });

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
