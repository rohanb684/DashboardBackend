import express from "express";
import {
  createNewOrder,
  getAllOrders,
  getOrderById,
  updateOrderAddress,
} from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", createNewOrder);
orderRouter.get("/get-all-orders", getAllOrders);
orderRouter.get("/get-order/:orderId", getOrderById);
orderRouter.put("/update-order-address/:orderId", updateOrderAddress);

export default orderRouter;
