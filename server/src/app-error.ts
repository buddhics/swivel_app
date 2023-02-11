export class AppError extends Error {
  status: number;
  isOperational: boolean;
  constructor(public statusCode: number = 500, public message: string) {
    super(message);
    this.status = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
