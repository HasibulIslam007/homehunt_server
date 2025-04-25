import mongoose, { Types } from "mongoose";
import { IJwtPayload } from "../auth/auth.interface";
// import { Coupon } from "../coupon/coupon.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

import { Product } from "../product/product.model";
import { Payment } from "../payment/payment.model";
import { generateTransactionId } from "../payment/payment.utils";

import { generateOrderInvoicePDF } from "../../utils/generateOrderInvoicePDF";
import { EmailHelper } from "../../utils/emailHelper";
import User from "../user/user.model";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import Shop from "../shop/shop.model";
import QueryBuilder from "../../builder/QueryBuilder";

const getMyShopOrders = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload
) => {
  const user = await User.findById(authUser.userId).select("isActive");

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  if (!user.isActive)
    throw new AppError(StatusCodes.BAD_REQUEST, "User account is not active!");

  const orderQuery = new QueryBuilder(
    Order.find({ user: authUser.userId }).populate("products.product coupon"),
    query
  )
    .search(["user.name", "products.product.name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getOrderDetails = async (orderId: string) => {
  const order = await Order.findById(orderId).populate(
    "user products.product coupon"
  );
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not Found");
  }

  order.payment = await Payment.findOne({ order: order._id });
  return order;
};

const getMyOrders = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload
) => {
  const orderQuery = new QueryBuilder(
    Order.find({ user: authUser.userId }).populate(
      "user products.product coupon"
    ),
    query
  )
    .search(["user.name", "user.email", "products.product.name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const OrderService = {
  getMyShopOrders,
  getOrderDetails,
  getMyOrders,
};
