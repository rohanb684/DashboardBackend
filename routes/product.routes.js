import express from "express";
import {
  addDummyProducts,
  getAllProductsWithoutPagination,
  getProductById,
  updateProductStocks,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.get("/get-all-products", getAllProductsWithoutPagination);
productRouter.get("/get-product/:productId", getProductById);
productRouter.post("/add-dummy-products", addDummyProducts);
productRouter.put("/update-stock", updateProductStocks);

export default productRouter;
