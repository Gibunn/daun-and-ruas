export interface ResponseWithData {
  success: boolean;
  status: number;
  data: unknown;
  message: string;
}

export interface ResponseWithoutData {
  success: boolean;
  status: number;
  message: string | string[];
}
