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
    console.log(productId);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError("Invalid product Id", 400);
    }
    const product = await Product.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }
    console.log(product);

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

export const updateProductById = async (req, res, next) => {
  console.log("Update Product");
  try {
    const productId = req.params.productId;
    const {
      collections,
      description,
      images,
      name,
      prices,
      primaryImage,
      status,
      tags,
    } = req.body;

    if (
      !description ||
      description.length < 1 ||
      !images ||
      images.length < 1 ||
      !name ||
      !prices ||
      prices.length !== 3 ||
      !primaryImage ||
      !status ||
      !tags ||
      tags.length < 1
    ) {
      throw new CustomError("Missing Fields", 400);
    }
    const product = await Product.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    product.collections = collections ? collections : [];
    product.tags = tags;
    product.name = name;
    product.images = images;
    product.prices = prices;
    product.description = description;
    product.primaryImage = primaryImage;
    product.status = status;

    await product.save();

    sendResponse(res, 201, "Products Updated Successfully");
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

export const updateImagesWithPrimaryImage = async (req, res, next) => {
  try {
    const products = await Product.find({}, "_id primaryImage");

    const bulkOps = products.map((product) => {
      return {
        updateOne: {
          filter: { _id: product._id },
          update: {
            images: product.primaryImage ? [product.primaryImage] : [],
          },
        },
      };
    });

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.status(200).json({
        success: true,
        message: "Images updated with primaryImage",
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No products found to update",
      });
    }
  } catch (error) {
    console.error("Error updating images:", error);
    next(error);
  }
};
