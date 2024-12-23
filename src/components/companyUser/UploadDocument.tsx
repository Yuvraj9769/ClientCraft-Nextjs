/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { ImFolderUpload } from "react-icons/im";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import InfiniteScroll from "./InfiniteScroll";

const UploadDocument = () => {
  const document = useRef<HTMLInputElement | null>(null);

  const handleUploadDocument = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
          toast.error(
            "File size exceeds the 10MB limit. Please select a smaller file."
          );
          return;
        }

        console.log("Sending file");

        const formData = new FormData();
        formData.append("document", file);

        const response = await axios.post(
          "api/companyUser/upload-document",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <CompanyUserLayout>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold">Upload Document</h1>
          <p className="text-lg">
            Easily upload your document and manage it securely.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
          >
            Go to Home
          </Link>
          <input
            type="file"
            ref={document}
            multiple={false}
            onChange={handleUploadDocument}
            hidden
          />
          <button
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
            onClick={() => document?.current?.click()}
          >
            <ImFolderUpload /> Upload New Document
          </button>
        </section>

        <InfiniteScroll />

        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">Upload Your Document</h2>
          <p className="text-lg mb-6">
            Seamlessly upload your files, keep them organized, and access them
            anytime with ease.{" "}
            <span className="font-semibold block">
              Note: Maximum file size for upload is 10 MB.
            </span>
          </p>

          <Link
            href="/upload-document"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <ImFolderUpload /> Upload Document
          </Link>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default UploadDocument;
