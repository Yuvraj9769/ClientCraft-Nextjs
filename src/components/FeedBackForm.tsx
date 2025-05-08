/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <section className="py-20 px-4 bg-background min-h-screen flex items-center justify-center">
      <Card className="max-w-xl w-full max-h-[750px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Feedback Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitFeedBack} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Enter your valuable feedback here</Label>
              <Textarea
                id="content"
                name="name"
                value={feedBackContent}
                onChange={handleOnChange}
                className="max-h-[550px]"
                placeholder="Enter feedback content here..."
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={dataProcessing}>
              {dataProcessing ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Submitting Feedback
                </span>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeedBackForm;
