import { z } from "zod";

const companyUserSignUpValidator = z.object({
  username: z
    .string()
    .min(2, "Username should have minimum 2 characters")
    .max(20, "Maximum 20 characters required"),
  firstName: z
    .string()
    .min(2, "First Name should have minimum 2 characters")
    .max(20, "Maximum 20 characters required"),
  lastName: z
    .string()
    .min(2, "First Name should have minimum 2 characters")
    .max(20, "Maximum 20 characters required"),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+?\d{1,3})?[-. ]?(\(?\d{1,4}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}|\d{3,4}[-. ]?\d{3,4}[-. ]?\d{4}$/,
      { message: "Please enter a valid phone number" }
    ),
  department: z
    .string()
    .min(2, "Department Name should have minimum 2 characters")
    .max(20, "Maximum 20 characters required"),
  companyName: z
    .string()
    .min(2, "Company Name should have minimum 2 characters")
    .max(20, "Maximum 20 characters required"),
  isActive: z.boolean().default(false),
  password: z.string().min(8, "Password should have minimum 8 characters"),
});

export default companyUserSignUpValidator;
