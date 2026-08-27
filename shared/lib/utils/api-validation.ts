import { NextRequest, NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
  timestamp: string;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

export function createErrorResponse(
  message: string,
  status = 400,
  details?: unknown,
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: status === 400 ? "Validation Error" : "API Error",
      message,
      details,
      timestamp: new Date().toISOString(),
    },
    { status },
  );
}

export function createSuccessResponse<T>(
  data: T,
  messageOrStatus?: string | number,
  maybeStatus?: number,
): NextResponse<ApiSuccess<T>> {
  let status = 200;
  let message: string | undefined;

  if (typeof messageOrStatus === "number") {
    status = messageOrStatus;
  } else if (typeof messageOrStatus === "string") {
    message = messageOrStatus;
    if (typeof maybeStatus === "number") status = maybeStatus;
  }

  return NextResponse.json(
    { success: true, data, message, timestamp: new Date().toISOString() },
    { status },
  );
}

export async function validateRequestBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validationErrors = (error as any).errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return {
        success: false,
        error: createErrorResponse("Validation failed", 400, validationErrors),
      };
    }
    return {
      success: false,
      error: createErrorResponse("Failed to parse request body", 400),
    };
  }
}

export function validateQueryParams<T>(
  schema: ZodSchema<T>,
  params: unknown,
): { success: true; data: T } | { success: false; error: NextResponse } {
  try {
    const validatedData = schema.parse(params);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: createErrorResponse("Invalid query parameters", 400, (error as any).errors),
      };
    }
    return {
      success: false,
      error: createErrorResponse("Failed to validate query parameters", 400),
    };
  }
}
