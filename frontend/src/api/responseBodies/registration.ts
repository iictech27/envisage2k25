interface RegistrationResBody {
  fullName: string,
  email: string,
  department: string,
  year: number,
  events: [number],
  price: number
  message: string
}

export type { RegistrationResBody };
