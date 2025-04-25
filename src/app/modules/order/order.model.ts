import { Schema, Types, model } from "mongoose";
import { IOrder } from "./order.interface";

import { Product } from "../product/product.model";

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "Online",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate total, discount, delivery charge, and final price
orderSchema.pre("validate", async function (next) {
  const order = this;

  // Step 1: Initialize total amount
  let totalAmount = 0;
  // let finalDiscount = 0;
  let shopId: Schema.Types.ObjectId | null = null;

  // Step 2: Calculate total amount for products
  for (let item of order.products) {
    const product = await Product.findById(item.product).populate("shop");

    if (!product) {
      return next(new Error(`Product not found!.`));
    }
    if (shopId && String(shopId) !== String(product.shop._id)) {
      return next(new Error("Products must be from the same shop."));
    }

    //@ts-ignore
    shopId = product.shop._id;

    let productPrice = product.rent;

    item.unitPrice = productPrice;
    const price = productPrice * item.quantity;
    console.log(price);
    totalAmount += price;
  }
});

export const Order = model<IOrder>("Order", orderSchema);
