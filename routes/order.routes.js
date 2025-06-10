import express from "express";
import {
  createNewOrder,
  getAllOrders,
} from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", createNewOrder);
orderRouter.get("/get-all-orders", getAllOrders);
export default orderRouter;
