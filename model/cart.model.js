import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtAddedTime: {
    type: Number,
    required: true,
  },
  selectedVariant: {
    type: Map,
    of: String, // e.g., { size: "M", color: "Red" }
    default: {},
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },
    items: [cartItemSchema],
    isConvertedToOrder: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Automatically update 'lastUpdated' on save
cartSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
