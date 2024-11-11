import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";

const CompanyUserDashbaord = () => {
  // Sample data for demonstration
  const clients = [
    {
      id: 1,
      name: "John Doe",
      project: "Website Redesign",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Jane Smith",
      project: "App Development",
      status: "Completed",
    },
    {
      id: 3,
      name: "Alice Brown",
      project: "Marketing Campaign",
      status: "Pending",
    },
  ];

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

          {/* Client Management Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Client Management
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <table className="min-w-full table-auto text-center">
                <thead>
                  <tr>
                    <th className="py-3 px-5 border-b font-semibold text-gray-700 dark:text-gray-300">
                      Client
                    </th>
                    <th className="py-3 px-5 border-b font-semibold text-gray-700 dark:text-gray-300">
                      Project
                    </th>
                    <th className="py-3 px-5 border-b font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="py-3 px-5 border-b">{client.name}</td>
                      <td className="py-3 px-5 border-b">{client.project}</td>
                      <td
                        className={`py-3 px-5 border-b font-semibold ${
                          client.status === "Completed"
                            ? "text-green-500"
                            : client.status === "Pending"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      >
                        {client.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
