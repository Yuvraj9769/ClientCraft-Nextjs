/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import { projectInterface } from "@/store/features/CRM/CRMSlice";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UpdateProjectDetails = () => {
  const params = useParams();

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

      if (
        projectDetails.budget.trim() === "" ||
        !/^\d+$/.test(projectDetails.budget)
      ) {
        toast.error("Please enter a valid project budget (numbers only)");
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
      router.push("/company-projects");
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
          <div className="container max-w-4xl mx-auto py-10 px-4">
            <Card className="border shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Project Details
                </CardTitle>
                <CardDescription>Update project information</CardDescription>
              </CardHeader>
              <form onSubmit={updateProject}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        type="text"
                        id="projectName"
                        value={projectDetails.projectName}
                        onChange={handleOnChange}
                        name="projectName"
                        placeholder="Enter project name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientName">Project Client Name</Label>
                      <Input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={projectDetails.clientName}
                        onChange={handleOnChange}
                        placeholder="Enter project client name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectStatus">Project Status</Label>
                      <Select
                        value={projectDetails.status}
                        onValueChange={(value) =>
                          handleOnChange({ target: { name: "status", value } })
                        }
                      >
                        <SelectTrigger id="projectStatus">
                          <SelectValue placeholder="Select Project Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Project Budget</Label>
                      <Input
                        type="text"
                        id="budget"
                        name="budget"
                        value={projectDetails.budget}
                        onChange={handleOnChange}
                        placeholder="Enter project budget"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={dataProcessing}
                  >
                    {dataProcessing ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin mr-2 h-4 w-4" />
                        Updating Project
                      </>
                    ) : (
                      <>Update Project</>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </>
    </CompanyUserLayout>
  );
};

export default UpdateProjectDetails;
