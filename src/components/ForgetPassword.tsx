/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";

type ResetPasswordFormDataType = {
  password: string;
  email: string;
  confPassword: string;
};

const ForgetPassword = () => {
  const [formData, setFormData] = useState<ResetPasswordFormDataType>({
    password: "",
    email: "",
    confPassword: "",
  });

  const [dataProcessing, setDataProcessing] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);

  const { passwordResetToken } = useParams();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.password.trim() === "") {
      toast.error("Password is required");
      return;
    } else if (formData.confPassword.trim() === "") {
      toast.error("Confirm Password is required");
      return;
    } else if (formData.password !== formData.confPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setDataProcessing(true);
      const res = await axios.post("/api/companyUser/resetPassword", formData);
      if (res.data.status === 200 && res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
      setFormData({
        password: "",
        confPassword: "",
        email: "",
      });
    }
  };

  useEffect(() => {
    if (passwordResetToken) {
      (async () => {
        try {
          setDataProcessing(true);
          await axios.get(
            `/api/companyUser/verifyPasswordResetToken/${passwordResetToken}`
          );
        } catch (error: any) {
          router.push("/forgetPasswordSendMail");
          toast.error(error.response.data.message || "Something went wrong");
        } finally {
          setDataProcessing(false);
          setPageLoader(false);
          setFormData({
            password: "",
            confPassword: "",
            email: "",
          });
        }
      })();
    }

    return () => {
      if (pageLoader) {
        setPageLoader(false);
      }
    };
  }, [passwordResetToken]);

  return (
    <div className="w-full min-h-screen inline-flex items-center justify-center">
      {pageLoader ? (
        <PageLoader />
      ) : (
        <div className="max-w-md sm:w-[380px] mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">
            Password Reset Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-black"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm password"
                className="block text-sm font-semibold text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confPassword"
                id="confPassword"
                value={formData.confPassword}
                onChange={handleChange}
                minLength={8}
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
                "Reset Password"
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
      )}
    </div>
  );
};

export default ForgetPassword;
