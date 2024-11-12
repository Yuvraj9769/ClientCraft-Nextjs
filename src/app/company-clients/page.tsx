import CompanyUserClients from "@/components/companyUser/CompanyUserClients";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients",
  description: "Client page for Company User to get data of all clients",
};

const CompanyUserClientsPage = () => {
  return <CompanyUserClients />;
};

export default CompanyUserClientsPage;
