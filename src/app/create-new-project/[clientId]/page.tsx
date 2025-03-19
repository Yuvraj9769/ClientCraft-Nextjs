import AddProjectForm from "@/components/companyUser/AddProjectForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Project",
  description: "Add a new project to your company",
};

const AddProjectFormPage = () => {
  return <AddProjectForm />;
};

export default AddProjectFormPage;
