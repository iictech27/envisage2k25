export interface ReqGetReg {
  adminName: string;
  adminPassword: string;
}

export interface ReqEditReg {
  adminName: string;
  adminPassword: string;
  regID: string;
}

export interface ResRegistration {
  regID: string;
  email: string;
  fullname: string;
  events: number[];
  paymentProof: string;
  verified: boolean;
  rejected: boolean;
  phone: string;
  college: string;
  year: number;
  totalPrice: number;
}

export interface ResRegAdmin {
  status: number;
  message: string;
  registrations: ResRegistration[];
  details: string;
}
