export interface ResponseWithData {
  success: boolean;
  data: unknown;
  message: string;
}

export interface ResponseWithoutData {
  success: boolean;
  message: string | string[];
}
