import { Schema } from "mongoose";

export interface IShop extends Document {
  //shopName: string;
  //businessLicenseNumber: string;
  address: string;
  contactNumber: string;
  //website?: string;
  user?: Schema.Types.ObjectId;
  detail_description: string[];
  // ratings?: number;
  //establishedYear: number;
  socialMediaLinks?: Map<string, string>;
  //taxIdentificationNumber: string;
  rental_rent: number;
  num_room: number;
  logo?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
