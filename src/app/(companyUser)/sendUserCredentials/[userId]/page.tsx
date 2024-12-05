import UserCredentials from "@/components/companyUser/UserCredentials";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "User Credentials",
  description: "Company User sending credentials to user",
};

const SendUserCredentials = () => {
  return <UserCredentials />;
};

export default SendUserCredentials;
