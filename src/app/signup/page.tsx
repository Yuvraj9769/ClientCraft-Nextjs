import CompanyUserSignUp from "@/components/CompanyUserSignUp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page",
  description: "SignUp Page to signup user to website",
};

const RegistrationForm = () => {
  return <CompanyUserSignUp />;
};

export default RegistrationForm;
