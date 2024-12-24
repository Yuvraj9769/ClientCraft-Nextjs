/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { IoMdAdd } from "react-icons/io";
import CountUp from "react-countup";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CompanyUserDashbaord = () => {
  const [overData, setOverViewData] = useState([
    { clientsCount: 0 },
    0,
    { totalCompanyUsers: 0 },
    [
      { _id: "Pending", count: 0 },
      { _id: "Active", count: 0 },
      { _id: "Completed", count: 0 },
    ],
  ]);

  const getOverData = useCallback(async () => {
    try {
      const response = await axios.get("/api/companyUser/overview");
      setOverViewData(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    }
  }, []);

  useEffect(() => {
    getOverData();
  }, []);

  return (
    <CompanyUserLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 px-6 text-center flex flex-col items-center gap-4">
          <h1 className="text-4xl font-extrabold">Company User Dashboard</h1>
          <p className="text-lg">
            Your centralized hub for client and project management.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Go to Home
          </Link>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Metrics Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Active Projects */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Active Projects
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][1]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </p>
              </div>

              {/* Completed Projects */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Completed Projects
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][2]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </p>
              </div>

              {/* Inactive Projects */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Inactive Projects
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={Array.isArray(overData[3]) ? overData[3][0]?.count : 0}
                    duration={3}
                    separator=","
                  />
                </p>
              </div>

              {/* Total Clients */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Total Clients
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={
                      typeof overData[0] === "object" &&
                      "clientsCount" in overData[0]
                        ? (overData[0]?.clientsCount as number)
                        : 0
                    }
                    duration={3}
                    separator=","
                  />
                </p>
              </div>

              {/* Active Clients */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Active Clients
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={overData[1] as number}
                    duration={3}
                    separator=","
                  />
                </p>
              </div>

              {/* Organization Users */}
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Organization Users
                </h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    start={0}
                    end={
                      typeof overData[2] === "object" &&
                      "totalCompanyUsers" in overData[2]
                        ? (overData[2]?.totalCompanyUsers as number)
                        : 0
                    }
                    duration={3}
                    separator=","
                  />
                </p>
              </div>
            </div>
          </section>

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Project
          </h2>
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2 my-6 rounded-2xl">
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

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 my-6">
            Client
          </h2>
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2 my-6 rounded-2xl">
            <h1 className="text-4xl font-extrabold">Manage Clients</h1>
            <p className="text-lg">
              Track client details, projects, and status updates.
            </p>
            <Link
              href="/"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
            >
              Go to Home
            </Link>
            <Link
              href="/add-new-client"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
            >
              <IoMdAdd /> Add New Client
            </Link>
          </section>

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 my-6">
            Note
          </h2>
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2 my-6 rounded-2xl">
            <h2 className="text-3xl font-semibold mb-4">
              Get Started on Your Notes
            </h2>
            <p className="text-lg mb-6">
              Create, edit, and organize your notes effortlessly to stay on top
              of everything.
            </p>
            <Link
              href="/"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700"
            >
              Go to Home
            </Link>

            <Link
              href="/add-note"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 my-2 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
            >
              <IoMdAdd /> Add New Note
            </Link>
          </section>

          {/* Messages Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Messages
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                No new messages
              </p>
            </div>
          </section>
        </main>
      </div>
    </CompanyUserLayout>
  );
};

export default CompanyUserDashbaord;
