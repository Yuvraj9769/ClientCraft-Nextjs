/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CompanyUserLayout from "./CompanyUserLayout";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProjectForm = () => {
  const [dataProcessing, setDataProcessing] = useState(false);
  const router = useRouter();

  type projectFormType = {
    projectName: string;
    projectClientName: string;
    projectStatus: string;
    projectBudget: string;
  };

  const [projectFormData, setProjectFormData] = useState<projectFormType>({
    projectName: "",
    projectClientName: "",
    projectStatus: "",
    projectBudget: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProjectFormData((preData) => ({ ...preData, [name]: value }));
  };

  const addNewProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (projectFormData.projectName.trim() === "") {
      toast.error("Please enter project name");
      return;
    }

    if (projectFormData.projectClientName.trim() === "") {
      toast.error("Please enter project client name");
      return;
    }

    if (projectFormData.projectStatus.trim() === "") {
      toast.error("Please enter project status");
      return;
    }

    if (projectFormData.projectBudget.trim() === "") {
      toast.error("Please enter project budget");
      return;
    }

    setDataProcessing(true);

    try {
      const res = await axios.post(
        "/api/companyUser/add-project",
        projectFormData
      );
      router.push("/company-projects");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Project creation failed");
    } finally {
      setProjectFormData({
        projectName: "",
        projectClientName: "",
        projectStatus: "",
        projectBudget: "",
      });
      setDataProcessing(false);
    }
  };

  return (
    <CompanyUserLayout>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-800 dark:via-teal-800 dark:to-purple-800 text-white py-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Add New Project</h1>
          <p className="text-lg mb-6">
            Enter the project details to get started.
          </p>
        </section>

        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={addNewProject}
              className="bg-white shadow-lg rounded-lg p-8 text-black"
            >
              <h2 className="text-2xl font-semibold mb-6">
                New Project Details
              </h2>

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
                  value={projectFormData.projectName}
                  onChange={handleOnChange}
                  name="projectName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectClient"
                  className="block text-lg font-semibold mb-2"
                >
                  Project Client Name
                </label>
                <input
                  type="text"
                  id="projectClientName"
                  name="projectClientName"
                  value={projectFormData.projectClientName}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project client name"
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
                <select
                  name="projectStatus"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={projectFormData.projectStatus}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select Project Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="projectBudget"
                  className="block text-lg font-semibold mb-2"
                >
                  Project Budget
                </label>
                <input
                  type="text"
                  id="projectBudget"
                  name="projectBudget"
                  value={projectFormData.projectBudget}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project budget"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200 inline-flex items-center justify-center gap-3"
              >
                {dataProcessing ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg font-semibold text-slate-50" />{" "}
                    Creating Project
                  </span>
                ) : (
                  <>Create Project</>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </CompanyUserLayout>
  );
};

export default AddProjectForm;
