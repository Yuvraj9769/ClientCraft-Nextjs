import CompanyUserLayout from "./CompanyUserLayout";

const AddNewClient = () => {
  return (
    <CompanyUserLayout>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Add New Client</h1>
          <p className="text-lg mb-6">
            Enter the client details to get started.
          </p>
        </section>

        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-3xl mx-auto">
            <form
              action="/api/projects"
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">
                New Client Details
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  id="projectClientName"
                  name="projectClientName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectName"
                  className="block text-lg font-semibold mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectStatus"
                  className="block text-lg font-semibold mb-2"
                >
                  Project Status
                </label>
                <input
                  type="text"
                  id="projectStatus"
                  name="projectStatus"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project status"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Client
              </button>
            </form>
          </div>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default AddNewClient;
