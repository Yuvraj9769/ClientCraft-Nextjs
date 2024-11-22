/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IoMdAdd } from "react-icons/io";
import { ImSpinner6 } from "react-icons/im";
import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProjects, setSearchedData } from "@/store/features/CRM/CRMSlice";
import PageLoader from "@/components/PageLoader";

const CompanyUserProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projectLoader, setProjectLoader] = useState(false);

  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects);
  const searchedData = useAppSelector((state) => state.searchedData);

  const [searchData, setSearchData] = useState({
    searchQuery: "",
  });

  const handleOnChange = (e: any) => {
    const { value } = e.target;

    if (searchedData.length !== 0 && value === "") {
      dispatch(setSearchedData([]));
    }
    setSearchData((preData) => ({ ...preData, searchQuery: value }));
  };

  const checkKey = async (e: any) => {
    if (e.key === "Enter" && searchData.searchQuery.trim() !== "") {
      try {
        setProjectLoader(true);
        const res = await axios.post(
          "/api/companyUser/search-project",
          searchData
        );
        dispatch(setSearchedData(res.data.data));
      } catch (error: any) {
        setSearchData({
          searchQuery: "",
        });
        toast.error(
          error.response.data.message || "Sorry something went wrong"
        );
      } finally {
        setProjectLoader(false);
      }
    }
  };

  const getAllProjects = useCallback(async () => {
    try {
      const res = await axios.get("/api/companyUser/get-projects");
      dispatch(setProjects(res.data.data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllProjects();

    return () => {
      // Cleanup
      setSearchData({
        searchQuery: "",
      });

      dispatch(setSearchedData([]));
    };
  }, []);

  return (
    <CompanyUserLayout>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold">Manage Your Projects</h1>
          <p className="text-lg">
            Stay organized and track all your projects efficiently.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
          >
            Go to Home
          </Link>
          <Link
            href="/create-new-project"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <IoMdAdd /> Create New Project
          </Link>
        </section>

        {/* Projects List Section */}

        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="relative left-0 top-0 w-full py-4">
              <PageLoader />
            </div>
          ) : searchedData.length !== 0 ? (
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
              <div className="w-full flex items-center justify-center p-4 lg:py-6 gap-4 flex-wrap lg:flex-nowrap">
                <div className="gap-3 w-full inline-flex mt-2 items-center justify-center text-black rounded-md pr-2">
                  <input
                    type="text"
                    value={searchData.searchQuery}
                    onChange={handleOnChange}
                    onKeyDown={checkKey}
                    placeholder="Search food by type/name"
                    className="p-2 rounded-md border-none outline-none w-[85%] lg:w-[45%] dark:bg-slate-800 duration-500  bg-slate-200 focus-within:ring-1 dark:focus-within:ring-blue-500 focus-within:ring-black group dark:text-slate-50 text-black"
                  />
                </div>
              </div>

              <div className="max-w-7xl p-4 flex flex-wrap gap-3 items-center mx-auto">
                {projectLoader ? (
                  <ImSpinner6 className="text-3xl md:text-6xl animate-spin" />
                ) : (
                  searchedData.map((proj, ind) => (
                    <div
                      className="max-w-sm w-full sm:w-[350px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden"
                      key={ind}
                    >
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-900 overflow-hidden inline-flex gap-1 w-full">
                          <span className="text-nowrap">Name:</span>
                          <span className="overflow-hidden text-ellipsis text-nowrap">
                            {proj.clientName}
                          </span>
                        </h3>
                        <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                          <span className="font-semibold text-nowrap">
                            Project:
                          </span>{" "}
                          <span className=" overflow-hidden text-ellipsis text-nowrap">
                            {proj.projectName}
                          </span>
                        </p>
                        <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                          <span className="font-semibold text-nowrap">
                            Budget:
                          </span>{" "}
                          <span className=" overflow-hidden text-ellipsis text-nowrap">
                            {proj.budget}
                          </span>
                        </p>

                        <p className="mt-2">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 shadow-md ${
                              proj.status === "Active"
                                ? "text-green-600"
                                : proj.status === "Completed"
                                ? "text-blue-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {proj.status}
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-2 p-4 border-t border-gray-300 justify-end">
                        <button
                          className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-2"
                          aria-label="Edit Client"
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-2"
                          aria-label="Delete Client"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : projects.length !== 0 ? (
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
              <div className="w-full flex items-center justify-center p-4 lg:py-6 gap-4 flex-wrap lg:flex-nowrap">
                <div className="gap-3 w-full inline-flex mt-2 items-center justify-center text-black rounded-md pr-2">
                  <input
                    type="text"
                    value={searchData.searchQuery}
                    onChange={handleOnChange}
                    onKeyDown={checkKey}
                    placeholder="Search project by client/project name"
                    className="p-2 rounded-md border-none outline-none w-[85%] lg:w-[45%] dark:bg-slate-800 duration-500  bg-slate-200 focus-within:ring-1 dark:focus-within:ring-blue-500 focus-within:ring-black group dark:text-slate-50 text-black"
                  />
                </div>
              </div>

              <div className="max-w-7xl p-4 flex flex-wrap gap-3 items-center mx-auto">
                {projects.map((proj, ind) => (
                  <div
                    className="max-w-sm w-full sm:w-[350px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden"
                    key={ind}
                  >
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 overflow-hidden inline-flex gap-1 w-full">
                        <span className="text-nowrap">Name:</span>
                        <span className="overflow-hidden text-ellipsis text-nowrap">
                          {proj.clientName}
                        </span>
                      </h3>
                      <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                        <span className="font-semibold text-nowrap">
                          Project:
                        </span>{" "}
                        <span className=" overflow-hidden text-ellipsis text-nowrap">
                          {proj.projectName}
                        </span>
                      </p>
                      <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                        <span className="font-semibold text-nowrap">
                          Budget:
                        </span>{" "}
                        <span className=" overflow-hidden text-ellipsis text-nowrap">
                          {proj.budget}
                        </span>
                      </p>

                      <p className="mt-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 shadow-md ${
                            proj.status === "Active"
                              ? "text-green-600"
                              : proj.status === "Completed"
                              ? "text-blue-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2 p-4 border-t border-gray-300 justify-end">
                      <button
                        className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-400 mx-2"
                        aria-label="Edit Client"
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-600 text-base sm:text-lg md:text-xl hover:text-red-400 mx-2"
                        aria-label="Delete Client"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-slate-50 mb-4">
                Sorry, no projects found.
              </h2>
              <p className="text-gray-300 text-center max-w-md text-xl md:text-2xl mb-6">
                It looks like there are no projects available at the moment.
                Start by adding a new project or check back later for updates.
              </p>
            </div>
          )}
        </main>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Get Started on New Projects
          </h2>
          <p className="text-lg mb-6">
            Create new projects, assign tasks, and track progress with ease.
          </p>
          <Link
            href="/create-new-project"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <IoMdAdd /> Create New Project
          </Link>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default CompanyUserProjects;
