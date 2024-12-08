import UpdateNoteData from "@/components/companyUser/UpdateNoteData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Note",
  description: "Update note page where company user can update the note",
};

const updateNotePage = () => {
  return <UpdateNoteData />;
};

export default updateNotePage;
