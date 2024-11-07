import ForgetPassword from "@/components/ForgetPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Forget Password Page to reset the password",
};

const ResetPasswordForm = () => {
  return <ForgetPassword />;
};

export default ResetPasswordForm;
