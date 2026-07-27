import type {
  ResponseWithData,
  ResponseWithoutData,
} from "@/models/response-model";
import { Prisma } from "../../generated/prisma/client";

export function Response(data: {
  success: boolean;
  status: number;
  data?: string | string[];
  message: string;
}): ResponseWithData | ResponseWithoutData {
  if (data.data) return data;
  return { success: data.success, status: data.status, message: data.message };
}

export function PrismaErrorResponse(error: unknown) {
  let message = "Internal server error";
  let status = 500;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        status = 409;
        const driverError = (error.meta as any)?.driverAdapterError;
        const originalMessage = driverError?.cause?.originalMessage as
          | string
          | undefined;

        const match = originalMessage?.match(/_([a-zA-Z0-9]+)_key/);
        const fieldName = match?.[1];

        message = fieldName
          ? `A record with that ${fieldName} already exists`
          : "A record with that data already exists";
        break;
      }
      case "P2025": {
        status = 404;
        message = (error.meta?.cause as string) ?? "Record not found";
        break;
      }
      case "P2003": {
        status = 400;
        const fieldName = error.meta?.field_name as string | undefined;
        message = fieldName
          ? `Invalid related data: ${fieldName} does not exist`
          : "Invalid related data (foreign key constraint)";
        break;
      }
      default:
        status = 500;
        message = "A database error occured";
    }
  }

  return { message, status };
}
