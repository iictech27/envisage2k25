// request bodies

export interface ReqSSRegistrationOrderBody {
    fullName?: string,
    email?: string,
    department?: string,
    year?: number,
    phone?: string,
    college?: string,
    eventIDs?: number[],
    additionalInfo?: string
}

// response bodies

export interface ResSSRegistrationBody {
    status: number,
    message: string,
    userFullName: string,
    userDept: string,
    userYear: number,
    userEmail: string,
    userPhone: string,
    userCollege: string,
    newRegisteredEventIDs: number[],
    price: number,
    paymentID: string,
    details: string
}
