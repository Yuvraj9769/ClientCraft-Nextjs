/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CompanyUserLayout from "./CompanyUserLayout";
import { ImSpinner9 } from "react-icons/im";

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
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={updateNote}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">Note Data</h2>

              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={currentNoteData.title}
                  onChange={handleOnChange}
                  name="title"
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title here..."
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={currentNoteData.description}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note description here..."
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="updatedAt"
                  className="block text-lg font-semibold mb-2"
                >
                  Note UpdatedAt (Automatically will update)
                </label>
                <input
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
                  className="w-full p-3 border border-gray-300 text-black bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200 inline-flex items-center justify-center gap-3"
              >
                {dataProcessing ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />{" "}
                    Updating Note
                  </span>
                ) : (
                  <>Update Note </>
                )}
              </button>
            </form>
          </div>
        </section>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateNoteData;
