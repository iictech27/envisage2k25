import { EventStructure } from "../../util/events.js"

export interface ReqRegistrationBody {
    department?: string,
    year?: number,
    eventIDs?: number[],
    additionalInfo?: string
}

export interface ResRegistrationBody {
    status: number,
    message: string,
    userFullName: string,
    userDept: string,
    userYear: number,
    userEmail: string,
    userRegisteredEventIDs: number[],
    price: number,
    details: string
}

export interface ResUserRegistrationsBody {
    status: number,
    message: string,
    events: EventStructure[],
    details: string
}
