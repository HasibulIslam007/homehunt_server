import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { IImageFiles } from "../../interface/IImageFile";
import { IJwtPayload } from "../auth/auth.interface";
import User from "../user/user.model";
import { IProduct } from "./product.interface";

import { Product } from "./product.model";

import Shop from "../shop/shop.model";

import { hasActiveShop } from "../../utils/hasActiveShop";

const createProduct = async (
  productData: Partial<IProduct>,
  productImages: IImageFiles,
  authUser: IJwtPayload
) => {
  const shop = await hasActiveShop(authUser.userId);

  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product images are required.");
  }

  productData.imageUrls = images.map((image) => image.path);

  const newProduct = new Product({
    ...productData,
    shop: shop._id,
  });

  const result = await newProduct.save();
  return result;
};

// Product.service.ts

const getAllProduct = async (query: Record<string, unknown>) => {
  const { location, page = "1", limit = "10" } = query;

  const filter: Record<string, any> = {
    isActive: true, // show only active listings
  };

  // Filter by location
  if (location) {
    filter.location = new RegExp(location as string, "i"); // case-insensitive match
  }

  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;

  const skip = (pageNumber - 1) * limitNumber;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("location")
      .skip(skip)
      .limit(limitNumber)
      .lean(),
    Product.countDocuments(filter),
  ]);

  const meta = {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
  };

  return {
    meta,
    result: products,
  };
};

const getSingleProduct = async (productId: string) => {
  const product = await Product.findById(productId).populate("name location");

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  if (!product.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product is not active");
  }

  const rent = await product.rent;

  const productObj = product.toObject();

  return {
    ...productObj,
    rent,
  };
};

const updateProduct = async (
  productId: string,
  payload: Partial<IProduct>,
  productImages: IImageFiles,
  authUser: IJwtPayload
) => {
  const { images } = productImages;

  const user = await User.findById(authUser.userId);
  const shop = await Shop.findOne({ user: user?._id });
  const product = await Product.findOne({
    shop: shop?._id,
    _id: productId,
  });

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");
  }
  if (!shop) {
    throw new AppError(StatusCodes.BAD_REQUEST, "You don't have a shop");
  }
  if (!shop.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Your shop is inactive");
  }
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product Not Found");
  }

  if (images && images.length > 0) {
    payload.imageUrls = images.map((image) => image.path);
  }

  return await Product.findByIdAndUpdate(productId, payload, { new: true });
};

const deleteProduct = async (productId: string, authUser: IJwtPayload) => {
  const user = await User.findById(authUser.userId);
  const shop = await Shop.findOne({ user: user?._id });
  const product = await Product.findOne({
    shop: shop?._id,
    _id: productId,
  });

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");
  }
  if (!shop) {
    throw new AppError(StatusCodes.BAD_REQUEST, "You don't have a shop");
  }
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product Not Found");
  }

  return await Product.findByIdAndDelete(productId);
};

export const ProductService = {
  createProduct,
  getAllProduct,

  getSingleProduct,
  updateProduct,
  deleteProduct,
};
