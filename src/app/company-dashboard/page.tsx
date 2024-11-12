import CompanyUserDashbaord from "@/components/companyUser/CompanyUserDashbaord";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for Company User",
};

const CompanyDashboardPage = () => {
  return <CompanyUserDashbaord />;
};

export default CompanyDashboardPage;
