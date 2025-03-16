interface UserSignupBody {
	fullName?: string,
	email?: string,
	password?: string
}

interface UserLoginBody {
    fullName?: string,
    email?: string,
    password?: string
}


export { UserSignupBody, UserLoginBody };
