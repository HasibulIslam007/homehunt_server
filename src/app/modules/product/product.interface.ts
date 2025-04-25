import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  location: string;
  slug: string;
  description: string;
  rent: number;
  rooms: number;
  bathrooms: number | null;
  phone_number: number;

  imageUrls: string[];
  isActive: boolean;
  shop: Types.ObjectId;

  averageRating?: number;
  ratingCount?: number;

  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Record<string, any> | [];

  calculateOfferPrice(): Promise<number | null>;
}
