/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CompanyUserLayout from "./CompanyUserLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import listPlugin from "@fullcalendar/list";
import { z } from "zod";
import toast from "react-hot-toast";

interface EventData {
  title: string;
  start: string;
  end: string;
}

const validateEventData = z
  .object({
    title: z.string().min(1, "Event title is required"),
    start: z
      .string()
      .min(1, "Start date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
      })
      .refine((val) => new Date(val).getTime() > Date.now(), {
        message: "Start date must be in the future",
      }),

    end: z
      .string()
      .min(1, "End date is required")
      .refine((val) => new Date(val).getTime() > Date.now(), {
        message: "End date must be in the future",
      }),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.start);
    const end = new Date(data.end);

    if (start.getTime() === end.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start and end time cannot be the same",
      });
    }
  });

const AddTaskToCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    start: "",
    end: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    setEventData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleDateSelect = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleAddEvent = useCallback(() => {
    const result = validateEventData.safeParse(eventData);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      toast.error(firstIssue.message);
      return;
    }

    try {
      //TODO: Make API call to add event to the calendar and also store it in the database.
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDialogOpen(false);
      setEventData({
        title: "",
        start: "",
        end: "",
      });
    }
  }, [eventData]);

  return (
    <CompanyUserLayout>
      <div className="w-full h-full p-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              select={handleDateSelect}
              headerToolbar={{
                left: "prev next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,listWeek",
              }}
              events={[
                {
                  title: "Landing Page Redesign",
                  start: "2025-04-01",
                  end: "2025-04-15",
                },
                {
                  title: "HRMS Dashboard",
                  start: "2025-04-10",
                  end: "2025-04-25",
                },
              ]}
              hiddenDays={[0]} // Hide Sundays
              height="auto"
              eventClassNames={() =>
                "bg-blue-500 text-white px-1 py-0.5 rounded text-sm transition-colors hover:bg-blue-600"
              }
            />
          </CardContent>
        </Card>

        {/* Event Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Fill in the event details and save to add it to your calendar.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Event Title
                </label>
                <Input
                  placeholder="Enter event title"
                  value={eventData?.title}
                  name="title"
                  onChange={handleOnChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Start Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={eventData?.start || ""}
                  className="w-fit"
                  name="start"
                  onChange={handleOnChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  End Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={eventData?.end || ""}
                  name="end"
                  className="w-fit"
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Add</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CompanyUserLayout>
  );
};

export default AddTaskToCalendar;
