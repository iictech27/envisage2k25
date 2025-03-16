interface UserSignInCredBody {
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface UserLogInCredBody {
  email: string,
  password: string,
  rememberUser: boolean
}

export type { UserSignInCredBody, UserLogInCredBody };
