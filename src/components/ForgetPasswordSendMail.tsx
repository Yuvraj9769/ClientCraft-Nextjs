/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
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
    setFormData({ ...formData, [name]: value.trim() });
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
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-[95%] sm:w-[380px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Email Verify Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                minLength={2}
                maxLength={50}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={dataProcessing}>
              {dataProcessing ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                  Processing
                </span>
              ) : (
                "Send Mail"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link
            href="/login"
            className="text-sm text-primary font-medium hover:underline"
          >
            Back
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPasswordSendMail;
