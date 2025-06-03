import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    type: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    maxUsage: {
      type: Number,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    perUserUsageLimit: {
      type: Number,
      default: 1,
    },

    minOrderValue: {
      type: Number,
      default: 0,
    },

    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    isAutomatic: {
      type: Boolean,
      default: false, // If true, no code is required; applies automatically
    },

    validFrom: {
      type: Date,
    },

    validUntil: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
