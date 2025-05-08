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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b min-h-screen flex items-center justify-center">
          <Card className="max-w-3xl w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                User Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateCompanyUserData} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={userData.username}
                      readOnly
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleOnChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleOnChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleOnChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={userData.companyName}
                      onChange={handleOnChange}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={userData.department}
                      onChange={handleOnChange}
                      placeholder="Enter department"
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="phoneNumber">Client Phone No.</Label>
                    <Input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleOnChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                <div className="w-full inline-flex items-center justify-end mt-4">
                  <Button
                    type="submit"
                    className="mt-4 w-full md:w-1/2"
                    disabled={dataProcessing}
                  >
                    {dataProcessing ? (
                      <span className="flex items-center gap-2">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Updating Client Data
                      </span>
                    ) : (
                      "Update Client Data"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      )}
    </CompanyUserLayout>
  );
};

export default UpdateCompanyUserProfile;
