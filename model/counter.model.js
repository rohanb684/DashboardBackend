import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // E.g., "orderId"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
