import UpdateProjectDetails from "@/components/companyUser/UpdateProject";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Project Details",
  description: "Update project details for the company user",
};

const UpdateProjectData = () => {
  return <UpdateProjectDetails />;
};

export default UpdateProjectData;
