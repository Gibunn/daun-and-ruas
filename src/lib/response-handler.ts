import type {
  ResponseWithData,
  ResponseWithoutData,
} from "@/models/response-model";

export function Response(data: {
  success: boolean;
  data?: string | string[];
  message: string;
}): ResponseWithData | ResponseWithoutData {
  if (data.data) return data;
  return { success: data.success, message: data.message };
}
