import { z } from "zod";

const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(5, "Phone number is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const updateAddressSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  isBillingSameAsShipping: z.boolean(),
});
