import ForgetPasswordSendMail from "@/components/ForgetPasswordSendMail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify Email to send password reset token to user",
};

const VerifyEmailForm = () => {
  return <ForgetPasswordSendMail />;
};

export default VerifyEmailForm;
