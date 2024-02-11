class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errormiddleware = (error, req, resp, next) => {
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  return resp.status(error.statusCode).json({
    status: false,
    message: error.message,
  });
};

export default ErrorHandler;
