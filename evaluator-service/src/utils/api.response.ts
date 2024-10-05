class ApiResponse {
  success;
  statusCode;
  message;
  data;
  // api error name , status code , message , error Object
  constructor(statusCode: number, message: string, data: any) {
    this.success = statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
