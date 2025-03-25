// request bodies

export interface ReqSSRegistrationOrderBody {
    fullName?: string,
    email?: string,
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
    userYear: number,
    userEmail: string,
    userPhone: string,
    userCollege: string,
    newRegisteredEventIDs: number[],
    price: number,
    details: string
}
