import express from "express";
import { createNewOrder } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", createNewOrder);

export default orderRouter;
