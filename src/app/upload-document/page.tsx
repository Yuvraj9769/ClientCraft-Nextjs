import UploadDocument from "@/components/companyUser/UploadDocument";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document",
  description:
    "Document page to get all documents of companyUser that uploaded by companyUser and also can upload new document",
};

const UploadDocumentPageWrapper = () => {
  return <UploadDocument />;
};

export default UploadDocumentPageWrapper;
