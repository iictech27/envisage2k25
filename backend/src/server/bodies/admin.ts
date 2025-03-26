export interface Registration {
  regID: string;
  email: string;
  fullname: string;
  events: number[];
  paymentProof: string;
  verified: boolean;
  phone: string;
  year: number;
  college: string;
  totalPrice: number;
  rejected: boolean;
}

export interface ResRegAdmin {
  status: number;
  message: string;
  registrations: Registration[];
  details: string;
}
