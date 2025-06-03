import { CustomError } from "./index.js";
class UserNotFound extends CustomError {
  constructor(message = "User Not Found") {
    super(message, 404);
  }
}

export default UserNotFound;
