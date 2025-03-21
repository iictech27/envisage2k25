export interface ReqRegistrationBody {
    department: string,
    year: number,
    eventIDs: number[],
    additionalInfo: string
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
