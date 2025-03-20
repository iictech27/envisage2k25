export interface ReqRegistrationBody {
    phone?: string,
    college?: string,
    department?: string,
    year?: number,
    eventIDs?: number[],
    additionalInfo?: string
}

export interface ReqRegistrationPaymentBody {
}

export interface ResRegistrationBody {
    status: number,
    message: string,
    userFullName: string,
    userDept: string,
    userYear: number,
    userEmail: string,
    userPhone: string,
    userCollege: string,
    userRegisteredEventIDs: number[],
    price: number,
    details: string
}
