/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import {
  setDarkMode,
  setLoggedIn,
  setUser,
} from "@/store/features/CRM/CRMSlice";

type loginFormDataType = {
  identifier: string;
  password: string;
};

const CompanyUserLogin = () => {
  const [formData, setFormData] = useState<loginFormDataType>({
    identifier: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.identifier.trim() === "") {
      toast.error("Username or email is required");
      return;
    } else if (formData.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    try {
      setDataProcessing(true);
      const res = await axios.post("/api/companyUser/login", formData);
      if (res.data.status === 200 && res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.data));
        dispatch(setLoggedIn(true));
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
      setFormData({
        identifier: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    function setClassByOSMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.className = "dark";
        dispatch(setDarkMode(true));
      } else {
        document.documentElement.className = "light";
        dispatch(setDarkMode(false));
      }
    }

    setClassByOSMode();
  }, []);

  return (
    <div className="w-full min-h-screen inline-flex items-center justify-center">
      <div className="max-w-md w-[95%] sm:w-[380px] mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Login Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 text-black"
        >
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold text-black"
            >
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              value={formData.identifier}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-black"
            >
              Password
            </label>
            <div className="border border-gray-300 rounded-md focus-within:outline-none focus-within:ring focus-within:ring-indigo-100">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                className="mt-1 block px-3 py-2 w-[90%] outline-none rounded-md"
                required
              />
              <span
                className="absolute right-2 top-1/2 text-lg cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
              "Login"
            )}
          </button>
          <span className="text-sm text-gray-600 hover:text-gray-800 transition text-center block w-full p-1 ">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              {" "}
              Sign up
            </Link>
          </span>
          <span className="text-sm text-gray-600 hover:text-gray-800 transition text-center block w-full p-1 ">
            <Link
              href="/forgetPasswordSendMail"
              className="text-blue-500 font-semibold hover:underline"
            >
              Forgot your password?
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default CompanyUserLogin;
