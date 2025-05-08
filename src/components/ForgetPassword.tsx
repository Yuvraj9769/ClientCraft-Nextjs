/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
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
        <div className="w-full min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-[95%] sm:w-[380px] mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Password Reset Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confPassword"
                    id="confPassword"
                    value={formData.confPassword}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={dataProcessing}
                >
                  {dataProcessing ? (
                    <span className="flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                      Processing
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <Link
                href="/login"
                className="text-sm text-primary font-medium hover:underline"
              >
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
