export interface Registration {
  regID: string,
  email: string;
  fullname: string;
  events: number[];
  paymentProof: string;
  verified: boolean;
  phone: string;
  year: number;
  college: string;
}

export interface ResRegAdmin {
  status: number,
  message: string,
  registrations: Registration[]
  details: string
}
