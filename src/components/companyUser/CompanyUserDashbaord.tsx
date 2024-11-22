import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { IoMdAdd } from "react-icons/io";

const CompanyUserDashbaord = () => {
  // Sample data for demonstration
  const metrics = {
    activeProjects: 12,
    completedProjects: 30,
    avgClientRating: 4.8,
  };

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
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Active Projects
                </h3>
                <p className="text-3xl font-bold">{metrics.activeProjects}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Completed Projects
                </h3>
                <p className="text-3xl font-bold">
                  {metrics.completedProjects}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-500 dark:text-teal-400 mb-2">
                  Total Clients
                </h3>
                <p className="text-3xl font-bold">{metrics.avgClientRating}</p>
              </div>
            </div>
          </section>

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Project
          </h2>
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2 w-full my-6 rounded-2xl">
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

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Client
          </h2>
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center flex flex-col items-center gap-2">
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

          {/* Notifications Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Notifications
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                You have 3 upcoming meetings and 2 deadlines this week.
              </p>
            </div>
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
