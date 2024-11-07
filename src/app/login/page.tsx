import CompanyUserLogin from "@/components/CompanyUserLogin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login Page to login user in website",
};

const LoginForm = () => {
  return <CompanyUserLogin />;
};

export default LoginForm;
