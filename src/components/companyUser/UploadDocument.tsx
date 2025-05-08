/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDocuments } from "@/store/features/CRM/CRMSlice";
import InfiniteScroll from "./InfiniteScroll";
import { Button } from "../ui/button";
import { Home, Loader2, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const UploadDocument = () => {
  const documentFile = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const handleUploadDocument = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setLoader(true);

      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
          toast.error(
            "File size exceeds the 10MB limit. Please select a smaller file."
          );
          return;
        }

        const formData = new FormData();
        formData.append("document", file);

        const response = await axios.post(
          "api/companyUser/upload-document",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success && response.data.status === 200) {
          toast.success(
            response.data.message || "Document uploaded successfully."
          );

          dispatch(setDocuments(response.data.data.documents));
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Please try again.");
    } finally {
      if (documentFile.current) {
        documentFile.current.value = "";
      }
      setLoader(false);
    }
  };

  return (
    <CompanyUserLayout>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <section className="border-b bg-background text-primary-foreground px-6 text-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
          <div className="container relative z-10 px-4 py-16 md:py-24 mx-auto flex flex-col items-center gap-4 md:gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black dark:text-white">
                Upload Document
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Easily upload your document and manage it securely.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
              <Link href="/">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="dark:text-white text-black"
                >
                  <Home className="h-5 w-5" />
                  Go to Home
                </Button>
              </Link>

              <input
                type="file"
                ref={documentFile}
                multiple={false}
                onChange={handleUploadDocument}
                hidden
              />

              <Button
                size="lg"
                className="gap-2"
                disabled={loader}
                onClick={() => documentFile.current?.click()}
              >
                {loader ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
                Upload New Document
              </Button>
            </div>
          </div>
        </section>

        <div className="px-4 md:px-6 lg:px-8 py-8">
          <InfiniteScroll />
        </div>

        <section className="py-20 px-4 md:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-semibold my-2">
                Upload Your Document
              </CardTitle>
              <CardDescription className="text-lg">
                Seamlessly upload your files, keep them organized, and access
                them anytime with ease.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm">
                Note: Maximum file size for upload is 10 MB.
              </p>

              <Button size="lg" className="gap-2" asChild>
                <Link
                  href="/upload-document"
                  onClick={() => documentFile.current?.click()}
                >
                  <Upload className="h-5 w-5" />
                  Upload Document
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default UploadDocument;
