/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CompanyUserLayout from "./CompanyUserLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "@/store/features/CRM/CRMSlice";

const UpdateCompanyUserProfile = () => {
  const user = useAppSelector((state) => state.user);

  const [dataProcessing, setDataProcessing] = useState(false);

  const [userData, setUserData] = useState(user);

  const [dataLoader, setDataLoader] = useState(true);

  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((preData) => ({ ...preData, [name]: value }));
  };

  const updateCompanyUserData = async (e: any) => {
    try {
      e.preventDefault();

      if (userData.companyName.trim() === "") {
        toast.error("Company Name is required");
        return;
      }

      if (userData.department.trim() === "") {
        toast.error("Department Name is required");
        return;
      }

      if (userData.email.trim() === "") {
        toast.error("Email is required");
        return;
      }

      if (userData.firstName.trim() === "") {
        toast.error("First name is required");
        return;
      }

      if (userData.lastName.trim() === "") {
        toast.error("Last name is required");
        return;
      }

      if (userData.phoneNumber.trim() === "") {
        toast.error("Phone number is required");
        return;
      }

      setDataProcessing(true);

      const response = await axios.patch(
        "/api/companyUser/updateProfile",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Profile updated successfully");
      dispatch(setUser(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setDataProcessing(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
      setDataLoader(false);
    }
  }, [user]);

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
              onSubmit={updateCompanyUserData}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">User Details</h2>

              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-lg font-semibold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={userData.username}
                  readOnly
                  name="username"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block text-lg font-semibold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={userData.firstName}
                  onChange={handleOnChange}
                  name="firstName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter firstName"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block text-lg font-semibold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={userData.lastName}
                  onChange={handleOnChange}
                  name="lastName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter lastName"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientEmail"
                  className="block text-lg font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="companyName"
                  className="block text-lg font-semibold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={userData.companyName}
                  onChange={handleOnChange}
                  name="companyName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter companyName"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="department"
                  className="block text-lg font-semibold mb-2"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="department"
                  value={userData.department}
                  onChange={handleOnChange}
                  name="department"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter department name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="clientPhone"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Phone No.
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client phone number"
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
                    Updating Client Data
                  </span>
                ) : (
                  <>Update Client Data</>
                )}
              </button>
            </form>
          </div>
        </section>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateCompanyUserProfile;
