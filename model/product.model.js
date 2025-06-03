import mongoose from "mongoose";

const countryPriceSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
  },
  { _id: false } // Prevent Mongo from creating _id for subdocs
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },

    prices: [countryPriceSchema], // ✅ Replaces price + priceCurrency

    // Optional Fields
    description: {
      type: String,
      trim: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    primaryImage: {
      type: String,
      trim: true,
    },

    images: [
      {
        type: String,
        trim: true,
      },
    ],
    stock: {
      type: Number,
      min: 0,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    collections: [
      {
        type: String,
        trim: true,
      },
    ],
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
    },
    variants: [
      {
        name: { type: String },
        options: [{ type: String }],
      },
    ],
    attributes: {
      type: Map,
      of: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    ratings: {
      average: { type: Number, min: 0, max: 5 },
      count: { type: Number, min: 0 },
    },
    availability: {
      type: String,
      enum: [
        "InStock",
        "OutOfStock",
        "PreOrder",
        "BackOrder",
        "Discontinued",
        "LimitedAvailability",
        "SoldOut",
      ],
      default: "InStock",
    },
    priceValidUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
