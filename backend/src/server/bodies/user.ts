import { EventStructure } from "../../util/events.js";

// request bodies

export interface ReqSignupBody {
	unveriUserID?: string,
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

export interface ReqLoginBody {
    email?: string,
    password?: string,
    rememberUser?: boolean
}

export interface ReqEmailVeriBody {
	userID?: string,
    otp?: string
}

export interface ReqResendEmailBody {
	userID?: string,
}

// response bodies
//
export interface ResUserSignupBody {
    status: number,
    message: string,
    fullName: string,
    email: string,
	userID: string,
    registeredEventIDs?: number[],
    details: string
}

export interface ResUserBody {
    status: number,
    message: string,
    fullName: string,
    email: string,
    registeredEventIDs?: number[],
    details: string
}

export interface ResUserRegEventsBody {
    status: number,
    message: string,
    events: EventStructure[],
    details: string
}

export interface ResEmailVeriBody {
    status: number,
    message: string,
    details: string
}
