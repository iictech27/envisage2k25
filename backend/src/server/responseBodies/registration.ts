export interface ReturnedRegistrationBody {
    status: number,
    message: string,
    userFullName: string,
    userDept: string,
    userYear: number,
    userEmail: string,
    userRegisteredEvents?: number[],
    price: number,
    details: string
}
