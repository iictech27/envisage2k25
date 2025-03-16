interface UserSignupBody {
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

interface UserLoginBody {
    email?: string,
    password?: string,
    rememberUser?: boolean
}


export { UserSignupBody, UserLoginBody };
