/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CompanyUserLayout from "./CompanyUserLayout";
import { ImSpinner9 } from "react-icons/im";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UpdateNoteData = () => {
  const { noteId } = useParams();

  const router = useRouter();

  const [dataLoader, setDataLoader] = useState(true);
  const [dataProcessing, setDataProcessing] = useState(false);

  const [currentNoteData, setCurrentNoteData] = useState({
    _id: "",
    title: "",
    description: "",
    updatedAt: "",
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentNoteData((preData) => ({ ...preData, [name]: value }));
  };

  const updateNote = async (e: any) => {
    try {
      e.preventDefault();

      if (currentNoteData.title.trim() === "") {
        toast.error("Title is required");
        return;
      }

      if (currentNoteData.description.trim() === "") {
        toast.error("Description is required");
        return;
      }

      setDataProcessing(true);

      setCurrentNoteData((preData) => ({ ...preData, _id: noteId as string }));

      const response = await axios.patch(
        "/api/companyUser/updateNote",
        currentNoteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Note updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");

      setCurrentNoteData({
        _id: "",
        title: "",
        description: "",
        updatedAt: "",
      });
    } finally {
      setDataProcessing(false);
      router.push("/add-note");
    }
  };

  const getrCuurentNoteData = useCallback(async () => {
    try {
      if (!noteId) return;

      const response = await axios.get(
        `/api/companyUser/getCuurentNoteData/${noteId}`
      );
      setCurrentNoteData(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
      router.push("/add-note");
    } finally {
      setDataLoader(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (currentNoteData.title.trim() === "") {
      getrCuurentNoteData();
    }
  }, []);

  return (
    <CompanyUserLayout>
      {dataLoader ? (
        <p className="text-5xl lg:text-6xl w-full min-h-screen h-full inline-flex items-center justify-center bg-slate-100 dark:bg-black">
          <ImSpinner9 className="animate-spin text-black dark:text-slate-50" />
        </p>
      ) : (
        <div className="container max-w-2xl mx-auto py-10 px-4">
          <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Note Data</CardTitle>
              <CardDescription>Update your note details below.</CardDescription>
            </CardHeader>
            <form onSubmit={updateNote}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={currentNoteData.title}
                    onChange={handleOnChange}
                    placeholder="Enter title here..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    value={currentNoteData.description}
                    onChange={handleOnChange}
                    placeholder="Enter note description here..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">
                    Note UpdatedAt (Automatically will update)
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    name="updatedAt"
                    value={
                      currentNoteData.updatedAt
                        ? new Date(currentNoteData.updatedAt)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleOnChange}
                    readOnly
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={dataProcessing}
                >
                  {dataProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
                      Updating Note
                    </span>
                  ) : (
                    "Update Note"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateNoteData;
