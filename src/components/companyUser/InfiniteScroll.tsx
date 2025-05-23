/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setDocuments } from "@/store/features/CRM/CRMSlice";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const InfiniteScroll: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const documents = useSelector((state: RootState) => state.documents);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get("api/companyUser/getDocuments");

      if (response.data.data.documents.length === 0) {
        toast.error("No documents found");
        return;
      }

      dispatch(setDocuments(response.data.data.documents));
    } catch (error: any) {
      toast.error(error.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full flex items-center justify-center p-2 md:p-4 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-50 min-h-[300px]">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[105px] w-full rounded-xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col w-full items-center justify-center p-6 rounded-lg shadow-md bg-white dark:bg-slate-800 max-w-md">
          <p className="font-semibold text-gray-900 dark:text-slate-50 text-3xl text-center">
            No documents found
          </p>
          <p className="text-gray-700 dark:text-slate-300 text-lg mt-3 text-center">
            Try uploading a document to see it here.
          </p>
        </div>
      ) : (
        <div className="p-2 w-full rounded-lg flex flex-col gap-3 md:gap-4 justify-center items-center max-w-6xl">
          <h1 className="text-3xl my-1 text-center font-semibold text-gray-900 dark:text-slate-50">
            Your Documents
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
            {documents.map((doc, ind) => (
              <Card
                key={ind}
                className="hover:shadow-lg dark:hover:shadow-gray-600 transition-shadow duration-300 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-1 w-full overflow-hidden h-[160px] flex flex-col"
              >
                <CardHeader className="p-2 space-y-0">
                  <Link
                    href={doc.documentLink}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-ellipsis text-nowrap overflow-hidden text-center font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {doc.title}
                  </Link>
                </CardHeader>
                <CardContent className="p-1 mt-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center text-ellipsis text-nowrap overflow-hidden">
                    {format(new Date(doc.createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
