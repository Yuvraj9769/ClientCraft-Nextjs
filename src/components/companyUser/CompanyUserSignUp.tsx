/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import signUpDataValidator from "@/utils/signUpDataValidator";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export type FormDataType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  department: string;
  password: string;
};

const CompanyUserSignUp = () => {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    department: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const checkValidation = signUpDataValidator(formData);

    if (!checkValidation?.isValid) {
      toast.error(checkValidation.message);
      return;
    }

    try {
      setDataProcessing(true);
      const res = await axios.post("/api/companyUser/signUp", formData);
      if (res.data.status === 201 && res.data.success === true) {
        toast.success(res.data.message);
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          phoneNumber: "",
          department: "",
          password: "",
        });
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">
        Company Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-black"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            minLength={2}
            maxLength={20}
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-black"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            minLength={2}
            maxLength={20}
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-black"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            minLength={2}
            maxLength={20}
            value={formData.lastName}
            onChange={handleChange}
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
            htmlFor="companyName"
            className="block text-sm font-semibold text-black"
          >
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            minLength={2}
            maxLength={20}
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold text-black"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-semibold text-black"
          >
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            minLength={2}
            maxLength={20}
            value={formData.department}
            onChange={handleChange}
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
            "Register"
          )}
        </button>
        <span className="text-sm text-gray-600 hover:text-gray-800 transition text-center block w-full p-1 my-2">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            {" "}
            Sign in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default CompanyUserSignUp;
