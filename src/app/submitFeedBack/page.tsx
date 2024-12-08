import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import FeedBackForm from "@/components/FeedBackForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Feedback page to submit the feedback",
};

const FeedBackFormPage = () => {
  return (
    <CompanyUserLayout>
      <FeedBackForm />
    </CompanyUserLayout>
  );
};

export default FeedBackFormPage;
