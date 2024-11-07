/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

type verifyMailFormDataType = {
  email: string;
};

const ForgetPasswordSendMail = () => {
  const [formData, setFormData] = useState<verifyMailFormDataType>({
    email: "",
  });

  const [dataProcessing, setDataProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    try {
      setDataProcessing(true);
      const res = await axios.post(
        "/api/companyUser/forgetPasswordMail",
        formData
      );
      if (res.data.status === 200 && res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
      setFormData({
        email: "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen inline-flex items-center justify-center">
      <div className="max-w-md sm:w-[380px] mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Email Verify Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {dataProcessing ? (
              <span className="inline-flex items-center justify-center gap-3">
                <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />{" "}
                Processing
              </span>
            ) : (
              "Send Mail"
            )}
          </button>
          <span className="text-center block w-full p-1 my-2">
            <Link
              href="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Back
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordSendMail;
