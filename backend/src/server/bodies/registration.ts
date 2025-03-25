import { Orders } from "razorpay/dist/types/orders.js";

// request bodies

export interface ReqRegistrationOrderBody {
    department?: string,
    year?: number,
    phone?: string,
    college?: string,
    eventIDs?: number[],
    additionalInfo?: string
}

export interface ReqRegistrationVerifyBody {
    rzpOrderID?: string,
    rzpPaymentID?: string,
    rzpSignature?: string,
}

// response bodies

export interface ResRegistrationVerifiedBody {
    status: number,
    message: string,
    userFullName: string,
    userYear: number,
    userEmail: string,
    userPhone: string,
    userCollege: string,
    newRegisteredEventIDs: number[],
    price: number,
    paymentID: string,
    details: string
}

export interface ResRegistrationOrderBody {
    status: number,
    message: string,
    userFullName: string,
    userEmail: string,
    order: Orders.RazorpayOrder,
    price: number,
    details: string
}
