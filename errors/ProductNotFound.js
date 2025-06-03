import { CustomError } from "./index.js";
class ProductNotFound extends CustomError {
  constructor(message = "Product Not Found") {
    super(message, 404);
  }
}

export default ProductNotFound;
