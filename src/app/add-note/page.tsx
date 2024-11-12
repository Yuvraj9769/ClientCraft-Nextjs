import AddNote from "@/components/companyUser/AddNote";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Note",
  description: "Add a new note",
};

const AddNotePage = () => {
  return <AddNote />;
};

export default AddNotePage;
