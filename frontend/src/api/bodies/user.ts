export interface ReqSignupBody {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ReqLoginBody {
    email: string,
    password: string,
    rememberUser: boolean
}

export interface ResUserBody {
    status: number,
    message: string,
    fullName: string,
    email: string,
    registeredEventIDs?: number[],
    details: string
}

