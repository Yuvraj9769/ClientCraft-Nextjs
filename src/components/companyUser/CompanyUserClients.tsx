import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import CompanyUserLayout from "./CompanyUserLayout";

const CompanyUserClients = () => {
  const sampleClients = [
    {
      id: 1,
      name: "John Doe",
      email: "123@usergmail.com",
      status: "Active",
      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "sample@usergmail.com",
      status: "In Progress",
      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "sale@usergmail.com",
      status: "Completed",

      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
    {
      id: 4,
      name: "John Doe",
      email: "123@usergmail.com",
      status: "Active",
      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "sample@usergmail.com",
      status: "In Progress",
      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
    {
      id: 6,
      name: "Alex Johnson",
      email: "sale@usergmail.com",
      status: "Completed",
      dateJoined: "2024-05-10",
      country: "India",
      phone: "123456789",
    },
  ];

  return (
    <CompanyUserLayout>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
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

        <div className="max-w-7xl p-4 flex flex-wrap gap-3 items-center mx-auto">
          {sampleClients.map((client, ind) => (
            <div
              className="max-w-sm w-full sm:w-[350px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden"
              key={ind}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 overflow-hidden inline-flex gap-1 w-full">
                  <span className="text-nowrap">Client Name:</span>
                  <span className="overflow-hidden text-ellipsis text-nowrap">
                    {client.name}
                  </span>
                </h3>
                <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                  <span className="font-semibold text-nowrap">Email:</span>{" "}
                  <span className=" overflow-hidden text-ellipsis text-nowrap">
                    john.doe@example.com
                  </span>
                </p>
                <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                  <span className="font-semibold text-nowrap">
                    Joined Date:
                  </span>{" "}
                  <span className=" overflow-hidden text-ellipsis text-nowrap">
                    {client.dateJoined}
                  </span>
                </p>
                <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                  <span className="font-semibold text-nowrap">Country:</span>{" "}
                  <span className=" overflow-hidden text-ellipsis text-nowrap">
                    {client.country}
                  </span>
                </p>
                <p className="text-gray-700 text-sm mt-1 overflow-hidden inline-flex gap-1 w-full">
                  <span className="font-semibold text-nowrap">
                    Phone Number:
                  </span>{" "}
                  <span className=" overflow-hidden text-ellipsis text-nowrap">
                    {client.phone}
                  </span>
                </p>
                <p className="mt-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      "Active" === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {client.status ? "Active" : "Inactive"}
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

        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Expand Your Client Network
          </h2>
          <p className="text-lg mb-6">
            Easily add new clients, assign them to projects, and manage their
            details effortlessly.
          </p>
          <Link
            href="/add-new-client"
            className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <IoMdAdd /> Add New Client
          </Link>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default CompanyUserClients;
