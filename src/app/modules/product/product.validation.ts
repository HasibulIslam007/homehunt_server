import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Product name is required",
      })
      .min(1, "Product name cannot be empty"),
    location: z
      .string({
        required_error: "location name is required",
      })
      .min(1, "Product name cannot be empty"),
    description: z
      .string({
        required_error: "Product description is required",
      })
      .min(1, "Product description cannot be empty"),
    rent: z
      .number({
        required_error: "Product price is required",
      })
      .min(0, "Product price cannot be less than 0"),
    rooms: z
      .number({
        required_error: "Product stock is required",
      })
      .min(0, "Product stock cannot be less than 0"),
    bathrooms: z
      .number()
      .min(0, "Weight cannot be less than 0")
      .nullable()
      .optional(),
    phone_number: z
      .number()
      .min(0, "Weight cannot be less than 0")
      .nullable()
      .optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name cannot be empty").optional(),
    description: z
      .string()
      .min(1, "Product description cannot be empty")
      .optional(),
    rent: z.number().min(0, "Product price cannot be less than 0").optional(),
    rooms: z.number().min(0, "Product stock cannot be less than 0").optional(),
    bathrooms: z
      .number()
      .min(0, "Weight cannot be less than 0")
      .nullable()
      .optional(),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
