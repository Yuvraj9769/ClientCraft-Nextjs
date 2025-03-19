/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FeedBackForm = () => {
  const [feedBackContent, setFeedBackContent] = useState("");

  const [dataProcessing, setDataProcessing] = useState(false);

  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  const handleOnChange = (e: any) => {
    setFeedBackContent(e.target.value);
  };

  const submitFeedBack = async (e: any) => {
    try {
      e.preventDefault();

      setDataProcessing(true);

      if (feedBackContent.trim() === "") {
        toast.error("Please enter the valid content!");
        return;
      }

      const response = await axios.post(
        "/api/companyUser/feedback",
        {
          data: feedBackContent,
          userId: user._id,
          email: user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setDataProcessing(false);
      router.push("/");
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={submitFeedBack}
          className="bg-white shadow-lg rounded-lg p-8 text-black"
        >
          <h2 className="text-2xl font-semibold mb-6">Feedback Content</h2>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-lg font-semibold mb-2"
            >
              Enter your valuable feedback here
            </label>
            <input
              type="text"
              id="content"
              value={feedBackContent}
              onChange={handleOnChange}
              name="name"
              className="w-full p-3 border text-black bg-slate-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter feedback content here..."
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
                Submitting Feedback
              </span>
            ) : (
              <>Submit Feedback</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedBackForm;
