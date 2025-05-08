import AddTaskToCalender from "@/components/companyUser/AddTaskToCalender";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Task To Calendar",
  description: "Add Task To Calendar",
};

const CalendarPage = () => {
  return <AddTaskToCalender />;
};

export default CalendarPage;
