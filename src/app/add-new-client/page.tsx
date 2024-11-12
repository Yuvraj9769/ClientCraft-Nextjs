import AddNewClient from "@/components/companyUser/AddNewClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Client",
  description: "Add new client to check its project data",
};

const AddNewClientPage = () => {
  return <AddNewClient />;
};

export default AddNewClientPage;
