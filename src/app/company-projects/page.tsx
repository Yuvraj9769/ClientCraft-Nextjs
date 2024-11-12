import CompanyUserProjects from "@/components/companyUser/CompanyUserProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project page for Company User to get all data of all projects",
};

const CompanyProjectPage = () => {
  return <CompanyUserProjects />;
};

export default CompanyProjectPage;
