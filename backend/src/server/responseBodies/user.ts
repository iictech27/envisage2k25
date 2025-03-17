export interface ReturnedUserBody {
    status: number,
    message: string,
    fullName: string,
    email: string,
    registeredEvents?: number[],
    details: string
}
