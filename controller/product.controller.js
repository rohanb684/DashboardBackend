import mongoose from "mongoose";
import { CustomError, ProductNotFound } from "../errors/index.js";
import Product from "../model/product.model.js";
import sendResponse from "../utils/sendResponse.js";

export const getAllProductsWithoutPagination = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    sendResponse(
      res,
      200,
      allProducts.length > 0 ? "Success" : "No products found",
      allProducts
    );
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError("Invalid product Id", 400);
    }
    const product = await Product.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    sendResponse(res, 200, "Success", product);
  } catch (error) {
    next(error);
  }
};

export const addDummyProducts = async (req, res, next) => {
  console.log("add dummy products");

  try {
    const products = req.body;
    if (!products || products.length < 1) {
      throw new CustomError("Empty products array", 400);
    }

    const createdProducts = await Promise.all(
      products.map((product) => Product.create(product))
    );

    sendResponse(res, 201, "Products added Successfully", createdProducts);
  } catch (error) {
    next(error);
  }
};

export const updateProductStocks = async (req, res) => {
  try {
    await Product.updateMany({}, { $set: { stock: 1000 } });
    res.send("Stock Updated");
  } catch (error) {
    console.log(error);
  }
};
