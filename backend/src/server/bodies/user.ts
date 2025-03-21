import { EventStructure } from "../../util/events.js";

// request bodies

export interface ReqSignupBody {
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

// response bodies

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
