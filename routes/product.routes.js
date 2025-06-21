import express from "express";
import {
  addDummyProducts,
  getAllProductsWithoutPagination,
  getProductById,
  updateImagesWithPrimaryImage,
  updateProductById,
  updateProductStocks,
} from "../controller/product.controller.js";
import Product from "../model/product.model.js";
import sendResponse from "../utils/sendResponse.js";

const productRouter = express.Router();

productRouter.get("/get-all-products", getAllProductsWithoutPagination);
productRouter.get("/get-product/:productId", getProductById);
productRouter.post("/add-dummy-products", addDummyProducts);
productRouter.put("/update-stock", updateProductStocks);
productRouter.put("/update-product/:productId", updateProductById);
productRouter.put("/update-images-with-primary", updateImagesWithPrimaryImage);

productRouter.delete("/delete-all-products", async (req, res, next) => {
  try {
    const deleteAllProducts = await Product.deleteMany();
    sendResponse(res, 200, "Deleted", deleteAllProducts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productRouter;
