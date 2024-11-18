import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CompanyUserProjects = () => {
  const sampleClients = [
    { id: 1, name: "John Doe", project: "Website Redesign", status: "Active" },
    { id: 2, name: "Jane Smith", project: "Mobile App", status: "In Progress" },
    {
      id: 3,
      name: "Alex Johnson",
      project: "SEO Campaign",
      status: "Completed",
    },
  ];

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
          <div className="w-full my-8 inline-flex items-center justify-center overflow-hidden">
            <table className="w-full max-w-7xl flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <thead className="w-full">
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-full inline-flex items-center justify-between">
                  <th className="py-3 w-[25%] lg:w-[40%] text-start max-w-[220px] px-5 font-semibold text-gray-700 dark:text-gray-300">
                    Client Name
                  </th>
                  <th className="py-3 w-[25%] lg:w-[40%] text-start max-w-[220px] px-5 font-semibold text-gray-700 dark:text-gray-300">
                    Project Name
                  </th>
                  <th className="py-3 w-[25%] lg:w-[40%] text-start max-w-[220px] px-5 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="py-3 w-[25%] lg:w-[40%] text-center max-w-[220px] px-5 font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col items-center gap-2 w-full">
                {sampleClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 w-full inline-flex items-center justify-between"
                  >
                    <td className="py-1 px-1 sm:p-3 text-start overflow-hidden text-ellipsis text-nowrap w-[25%] lg:w-[40%] max-w-[290px]">
                      {client.name}
                    </td>
                    <td className="py-1 px-1 sm:p-3 text-start overflow-hidden text-ellipsis text-nowrap w-[25%] lg:w-[40%] max-w-[290px]">
                      {client.project}
                    </td>
                    <td
                      className={`py-1 px-1 sm:p-3 text-start overflow-hidden text-ellipsis text-nowrap w-[25%] lg:w-[40%] max-w-[290px] font-semibold ${
                        client.status === "Completed"
                          ? "text-green-500"
                          : client.status === "Active"
                          ? "text-teal-500"
                          : client.status === "Pending" && "text-yellow-500"
                      }`}
                    >
                      {client.status}
                    </td>
                    <td className="py-1 px-1 sm:p-3 text-center overflow-hidden text-ellipsis text-nowrap font-semibold  w-[25%] lg:w-[40%] max-w-[220px]">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
