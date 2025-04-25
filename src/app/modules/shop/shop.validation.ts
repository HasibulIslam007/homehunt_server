import { z } from "zod";

const createShopValidation = z.object({
  body: z.object({
    address: z.string().min(1, "Address is required."),
    contactNumber: z.string().min(1, "Contact number is required."),

    detail_description: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => {
        if (Array.isArray(val)) return val.join(", ");
        return val;
      }),

    rental_rent: z.coerce.number().min(0, "Rental rent must be a number."),
    num_room: z.coerce.number().min(1, "Number of rooms must be at least 1."),
  }),
});

export const ShopValidation = {
  createShopValidation,
};
