import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import CompanyUserLayout from "./CompanyUserLayout";

const CompanyUserProjects = () => {
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
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-12 text-gray-900 dark:text-gray-100">
              Your Projects
            </h2>
            <div className="flex flex-wrap gap-10 justify-center">
              {/* Project Card 1 */}
              <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[240px] flex flex-col items-center gap-2">
                <h3 className="text-xl font-semibold ">Project A</h3>
                <p className="inline-flex w-full items-center gap-x-2">
                  <span>Client Name:</span>
                  <span className="font-bold w-[65%] bg-teal-600">
                    John Doe
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 bg-red-600 h-[120px]">
                  A brief description of the project. Track deadlines, tasks,
                  and progress.
                </p>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                <h3 className="text-xl font-semibold ">Project B</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Another project description here. Collaborate with your team
                  and keep things on track.
                </p>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white shadow-lg p-6 rounded-lg dark:bg-gray-700 dark:text-white sm:w-[350px] sm:h-[220px]">
                <h3 className="text-xl font-semibold ">Project C</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Track all important details of this project and monitor your
                  team&apos;s progress.
                </p>
              </div>
            </div>
          </div>
        </section>

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
