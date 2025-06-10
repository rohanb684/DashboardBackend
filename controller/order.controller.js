import mongoose from "mongoose";
import CustomError from "../errors/CustomError.js";
import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
import sendResponse from "../utils/sendResponse.js";
import { extractAndValidateAddress } from "../utils/addressValidation.js";
import { getNextSequence } from "../utils/getNextSequence.js";

// - currently this function does not add user._id in the model as this is for abaan which do not have login functionality.
export const createNewOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { items, shippingAddress, billingAddress, isBillingSameAsShipping } =
      req.body;

    if (
      !items ||
      items.length < 1 ||
      typeof isBillingSameAsShipping !== "boolean" ||
      !shippingAddress ||
      !billingAddress
    ) {
      throw new CustomError("Some Fields are missing", 400);
    }

    const validatedShippingAddress = extractAndValidateAddress(
      shippingAddress,
      "Shipping"
    );

    let validatedBillingAddress;
    if (!!isBillingSameAsShipping) {
      validatedBillingAddress = extractAndValidateAddress(
        billingAddress,
        "Billing"
      );
    }
    const orderedProducts = [];
    let amountTotal = 0;

    session.startTransaction();
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new CustomError(`Product not found ${item.productId}`, 404);
      }

      if (!item.quantity) {
        throw new CustomError(
          `Product quantity is missing for ${item.name}`,
          400
        );
      }

      const findCountryPrice = product.prices.find(
        (price) => price.country === item.country
      );
      if (!findCountryPrice) {
        throw new CustomError(`Invalid Country ${item.country}`, 400);
      }

      if (findCountryPrice.price !== item.price) {
        throw new CustomError("Change in prices of some products", 400);
      }

      if (product.stock < item.quantity) {
        throw new CustomError(
          `Insufficient stock for product ${product.name}`,
          400
        );
      }

      const productToAdd = {
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: findCountryPrice.price,
        country: findCountryPrice.country,
        currency: findCountryPrice.currency,
        productPrimaryImage: product.primaryImage,
      };

      amountTotal += productToAdd.price * item.quantity;
      orderedProducts.push(productToAdd);
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const sequenceNumber = await getNextSequence("orderId");
    const orderId = `ORD${String(sequenceNumber).padStart(5, "0")}`;

    const newOrder = await Order.create(
      [
        {
          orderId,
          items: orderedProducts,
          shippingAddress: validatedShippingAddress,
          billingAddress: validatedBillingAddress || validatedShippingAddress,
          isBillingSameAsShipping,
          totalAmount: amountTotal,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    sendResponse(res, 201, "Order Successfully Created", newOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.find();

    sendResponse(
      res,
      200,
      allOrders.length > 0 ? "Success" : "No Orders found",
      allOrders
    );
  } catch (error) {
    next(error);
  }
};
