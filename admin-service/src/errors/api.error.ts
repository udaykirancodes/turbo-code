class ApiError extends Error {
  name;
  statusCode;
  message;
  error;
  // api error name , status code , message , error Object
  constructor(
    name: string,
    statusCode: number,
    message: string,
    error: Object
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export default ApiError;
