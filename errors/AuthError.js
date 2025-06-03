import { CustomError } from "./index.js";

class AuthError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export default AuthError;
