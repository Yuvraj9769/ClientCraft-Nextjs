/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import {
  projectInterface,
  setSearchedData,
} from "@/store/features/CRM/CRMSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";

const UpdateProjectDetails = () => {
  const params = useParams();

  const dispatch = useAppDispatch();

  const [projectDetails, setProjectDetails] = useState<projectInterface>({
    _id: "",
    clientName: "",
    projectName: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    budget: "",
  });

  const [projectLoader, setProjectLoader] = useState(true);

  const [dataProcessing, setDataProcessing] = useState(false);

  const searchedData = useAppSelector((state) => state.searchedData);

  const router = useRouter();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const updateProject = async (e: any) => {
    try {
      e.preventDefault();

      if (projectDetails.clientName.trim() === "") {
        toast.error("Client Name is required");
        return;
      }

      if (projectDetails.projectName.trim() === "") {
        toast.error("Project Name is required");
        return;
      }

      if (projectDetails.status.trim() === "") {
        toast.error("Please select a valid status");
        return;
      }

      if (projectDetails.budget.trim() === "") {
        toast.error("Budget is required");
        return;
      }

      setDataProcessing(true);

      const response = await axios.patch(
        "/api/companyUser/update-project",
        projectDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Project updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Sorry something went wrong");
    } finally {
      setDataProcessing(false);
      router.push("/company-projects");

      if (searchedData.length !== 0) {
        dispatch(setSearchedData([]));
      }
    }
  };

  const getCurrentProjectData = async () => {
    if (!params.projId) return;

    try {
      const response = await axios.get(
        `/api/companyUser/getDynamicProject/${params.projId}`
      );
      setProjectDetails(response.data.data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Sorry something went wrong"
      );
    } finally {
      setProjectLoader(false);
    }
  };

  useEffect(() => {
    if (projectDetails._id.trim() === "") {
      getCurrentProjectData();
    }

    return () => {
      setProjectDetails({
        _id: "",
        clientName: "",
        projectName: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        budget: "",
      });
    };
  }, [params.projId]);

  return (
    <CompanyUserLayout>
      <>
        {projectLoader ? (
          <p className="text-5xl lg:text-6xl w-full min-h-screen h-full inline-flex items-center justify-center bg-slate-100 dark:bg-black">
            <ImSpinner9 className="animate-spin text-black dark:text-slate-50" />
          </p>
        ) : (
          projectDetails._id.trim() !== "" && (
            <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 border-b">
              <div className="max-w-3xl mx-auto">
                <form
                  onSubmit={updateProject}
                  className="bg-white shadow-lg rounded-lg p-8 text-black"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Project Details
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
                      value={projectDetails.projectName}
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
                      id="clientName"
                      name="clientName"
                      value={projectDetails.clientName}
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
                      name="status"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={projectDetails.status}
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
                      id="budget"
                      name="budget"
                      value={projectDetails.budget}
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
                        Updating Project
                      </span>
                    ) : (
                      <>Update Project</>
                    )}
                  </button>
                </form>
              </div>
            </section>
          )
        )}
      </>
    </CompanyUserLayout>
  );
};

export default UpdateProjectDetails;
