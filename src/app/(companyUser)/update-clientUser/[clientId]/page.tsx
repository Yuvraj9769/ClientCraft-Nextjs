import UpdateClientsInfo from "@/components/companyUser/UpdateClientsInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Client Data",
  description: "Update client data page",
};

const UpdateClientData = () => {
  return <UpdateClientsInfo />;
};

export default UpdateClientData;
