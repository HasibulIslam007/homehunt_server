import mongoose, { Schema, Document, Model } from "mongoose";
import { IShop } from "./shop.interface";

const shopSchema = new Schema<IShop>(
  {
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    detail_description: {
      type: [String],
      required: true,
    },

    socialMediaLinks: {
      type: Map,
      of: String,
      default: null,
    },

    rental_rent: {
      type: Number,
      required: true,
    },
    num_room: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shop: Model<IShop> = mongoose.model<IShop>("Shop", shopSchema);
export default Shop;
