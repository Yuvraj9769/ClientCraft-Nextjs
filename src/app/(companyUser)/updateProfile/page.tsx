import UpdateCompanyUserProfile from "@/components/companyUser/UpdateCompanyUserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company User Profile",
  description: "Company user profile page where user can update their data",
};

const UpdateProfilePage = () => {
  return <UpdateCompanyUserProfile />;
};

export default UpdateProfilePage;
