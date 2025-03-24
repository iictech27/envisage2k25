/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResErrorBody {
  code: number;
  error: string;
}

export function isResError(obj: any): obj is ResErrorBody {
  return obj.code && obj.error;
}
