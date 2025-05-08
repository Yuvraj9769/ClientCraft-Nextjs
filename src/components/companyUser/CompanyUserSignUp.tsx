/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import signUpDataValidator from "@/utils/signUpDataValidator";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setDarkMode } from "@/store/features/CRM/CRMSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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

  const dispatch = useAppDispatch();

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
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDataProcessing(false);
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
    <Card className="max-w-md w-[95%] mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Company Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              minLength={2}
              maxLength={20}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              minLength={2}
              maxLength={20}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              minLength={2}
              maxLength={20}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              minLength={2}
              maxLength={20}
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              type="text"
              id="department"
              name="department"
              minLength={2}
              maxLength={20}
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPass ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={dataProcessing}>
            {dataProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CompanyUserSignUp;
