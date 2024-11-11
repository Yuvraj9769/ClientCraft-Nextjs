/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ClientLayout from "@/components/client/ClientLayout";
import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import PageLoader from "@/components/PageLoader";
import { setUser } from "@/store/features/CRM/CRMSlice";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Home() {
  // memorizes a function so that it doesn't get recreated on every render.
  const getUserData = useCallback(async () => {
    try {
      const res = axios.get("/api/companyUser/auth");
      return res;
    } catch (error: any) {
      throw new Error(error.message || "Sorry something went wrong");
    }
  }, []);

  const [loadingData, setLoadingData] = useState(true);

  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.username) {
      getUserData()
        .then((data) => dispatch(setUser(data.data.data)))
        .catch((error) => toast.error(error.message))
        .finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  }, []);

  return (
    <>
      {loadingData ? (
        <PageLoader />
      ) : user.role === "client" ? (
        <ClientLayout>
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
              <h1 className="text-4xl font-extrabold mb-4">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-lg mb-6">
                Track your projects and communicate with your company.
              </p>
              <Link
                href="/company-dashboard"
                className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Go to Dashboard
              </Link>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-gray-900 dark:text-gray-100">
                  Features
                </h2>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-10 justify-center">
                  <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                    <h3 className="text-xl font-semibold mb-4">
                      View Project Status
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Stay up to date on the progress of your projects. Track
                      deadlines, tasks, and milestones.
                    </p>
                  </div>
                  <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                    <h3 className="text-xl font-semibold mb-4">Client Chat</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Engage with your company directly through real-time chat
                      to ask questions or request updates.
                    </p>
                  </div>
                  <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                    <h3 className="text-xl font-semibold mb-4">
                      Track Deliverables
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Keep an eye on the deliverables for your projects,
                      including important documents and progress reports.
                    </p>
                  </div>
                  <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                    <h3 className="text-xl font-semibold mb-4">
                      Feedback & Reviews
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Provide feedback on your projects and communicate any
                      revisions or suggestions directly with your team.
                    </p>
                  </div>
                  <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                    <h3 className="text-xl font-semibold mb-4">
                      Notifications
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Stay informed with instant notifications about project
                      updates, new messages, and important deadlines.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
              <h2 className="text-3xl font-semibold mb-4">
                Explore Your Dashboard
              </h2>
              <p className="text-lg mb-6">
                Stay on top of your projects and communicate with your company
                representatives directly.
              </p>
              <Link
                href="/company-dashboard"
                className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Go to Dashboard
              </Link>
            </section>
          </div>
        </ClientLayout>
      ) : (
        user.role === "companyUser" && (
          <CompanyUserLayout>
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              {/* Hero Section */}
              <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
                <h1 className="text-4xl font-extrabold mb-4">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-lg mb-6">
                  Manage your clients and projects seamlessly.
                </p>
                <Link
                  href="/company-dashboard"
                  className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Go to Dashboard
                </Link>
              </section>
              {/* Features Section */}
              <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-3xl font-semibold mb-12 text-gray-900 dark:text-gray-100">
                    Features
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-10 justify-center">
                    <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                      <h3 className="text-xl font-semibold mb-4">
                        Manage Clients
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Easily manage and organize all your client data in one
                        centralized platform, allowing you to track important
                        client details and interactions.
                      </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                      <h3 className="text-xl font-semibold mb-4">
                        Track Projects
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Stay on top of all your projects by tracking deadlines,
                        tasks, and progress in real time. Keep your team aligned
                        and informed.
                      </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                      <h3 className="text-xl font-semibold mb-4">
                        Client Chat
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Engage with your clients directly through real-time
                        chat. Keep your clients updated, answer their questions
                        instantly, and provide personalized support, all within
                        the platform.
                      </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                      <h3 className="text-xl font-semibold mb-4">
                        Team Collaboration Chat
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Facilitate seamless communication within your company.
                        Collaborate with team members, share updates, and
                        resolve issues quickly through dedicated company-wide
                        chat channels.
                      </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                      <h3 className="text-xl font-semibold mb-4">Add Note</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Keep important information at your fingertips. Add,
                        edit, and organize your personal or team notes
                        efficiently to stay on top of your tasks and goals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* CTA Section */}
              <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
                <h2 className="text-3xl font-semibold mb-4">
                  Explore Your Dashboard
                </h2>
                <p className="text-lg mb-6">
                  Manage your clients and projects, and track your team&apos;s
                  progress all in one place.
                </p>
                <Link
                  href="/company-dashboard"
                  className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Go to Dashboard
                </Link>
              </section>
            </div>
          </CompanyUserLayout>
        )
      )}
    </>
  );
}
