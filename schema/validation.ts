import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const invalid_type_error: string = "Invalid type provided for this field";
const required_error: string = "This field cannot be blank";

export const FormRegisterSchema = z.object({
  full_name: z.string({ invalid_type_error, required_error }).min(5, {
    message: "Full Name must be at least 5 characters.",
  }),
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: "There might be an error in your email." })
    .min(5, {
      message: "Email must be at least 5 characters.",
    }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  username: z.string({ invalid_type_error, required_error }).min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  password: z
    .string({ invalid_type_error, required_error })
    .min(8, { message: "Your password must contain at least 8 characters" })
    .max(16),
});

export const ActivateRegisterSchema = z.object({
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: "There might be an error in your email." })
    .min(5, {
      message: "Email must be at least 5 characters.",
    }),
  activate_code: z.string({ invalid_type_error, required_error }).length(6),
});

export const FormLoginSchema = z.object({
  username: z.string({ invalid_type_error, required_error }).min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  password: z
    .string({ invalid_type_error, required_error })
    .min(8, { message: "Your password must contain at least 8 characters" })
    .max(16),
});

export const ResetPasswordSchema = z.object({
  activation_code: z.string({ invalid_type_error, required_error }).length(6),
  new_password: z
    .string({ invalid_type_error, required_error })
    .min(8, { message: "Your password must contain at least 8 characters" })
    .max(16),
  confirm_password: z
    .string({ invalid_type_error, required_error })
    .min(8, { message: "Your password must contain at least 8 characters" })
    .max(16),
});

export const EmailSchema = z.object({
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: "There might be an error in your email." })
    .min(5, {
      message: "Email must be at least 5 characters.",
    }),
});

export const ProfileSchema = z.object({
  full_name: z.string({ invalid_type_error, required_error }).min(5, {
    message: "Full Name must be at least 5 characters.",
  }),
  username: z.string({ invalid_type_error, required_error }).min(2, {
    message: "Full Name must be at least 5 characters.",
  }),
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: "There might be an error in your email." })
    .min(5, {
      message: "Email must be at least 5 characters.",
    }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
});

export const AddRestaurant = z.object({
  name: z.string({ invalid_type_error, required_error }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Price must be at least 2 characters." })
    .max(11),
  description: z.string({ invalid_type_error, required_error }).min(20, {
    message: "Description must be at least 20 characters.",
  }),
  phone: z
    .string()
    .min(1)
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  select_region: z
    .string({
      required_error: "Please select an region to display.",
    })
    .min(1, { message: "Address must be entered!" }),
  select_district: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Address must be entered!" }),
  select_neighbourhood: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Address must be entered!" }),
  street: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Street must be at least 2 characters" }),
  house_number: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "House number must be at least 1 characters" }),
  people_size: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "The number of people must be specified!" }),
  select_morning: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
  select_afternoon: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
  select_evening: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
});

export const EditRestaurant = z.object({
  name: z.string({ invalid_type_error, required_error }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Price must be at least 2 characters." })
    .max(11),
  description: z.string({ invalid_type_error, required_error }).min(20, {
    message: "Description must be at least 20 characters.",
  }),
  phone: z
    .string()
    .min(1)
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  select_region: z
    .string({
      required_error: "Please select an region to display.",
    })
    .min(1, { message: "Address must be entered!" }),
  select_district: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Address must be entered!" }),
  select_neighbourhood: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Address must be entered!" }),
  street: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Street must be at least 2 characters" }),
  house_number: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "House number must be at least 1 characters" }),
  people_size: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "The number of people must be specified!" }),
  select_morning: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
  select_afternoon: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
  select_evening: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Time must be set" }),
});
