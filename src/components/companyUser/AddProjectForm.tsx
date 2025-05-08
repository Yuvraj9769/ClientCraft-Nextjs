/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import CompanyUserLayout from "@/components/companyUser/CompanyUserLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddProjectForm = () => {
  const [dataProcessing, setDataProcessing] = useState(false);
  const router = useRouter();

  const { clientId } = useParams();

  const [loader, setLoader] = useState(true);

  type projectFormType = {
    projectName: string;
    projectStatus: string;
    projectBudget: string;
  };

  const [projectFormData, setProjectFormData] = useState<projectFormType>({
    projectName: "",
    projectStatus: "",
    projectBudget: "",
  });

  const [currentClientData, setCurrentClientData] = useState({
    _id: "",
    name: "",
    email: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProjectFormData((preData) => ({ ...preData, [name]: value }));
  };

  const addNewProject = async (e: React.FormEvent) => {
    e.preventDefault();

    setDataProcessing(true);

    try {
      if (
        currentClientData.email.trim() === "" ||
        currentClientData.email.length === 0
      ) {
        toast.error("Sorry first add client");
        return;
      }

      if (projectFormData.projectName.trim() === "") {
        toast.error("Please enter project name");
        return;
      }

      if (projectFormData.projectStatus.trim() === "") {
        toast.error("Please enter project status");
        return;
      }

      if (
        projectFormData.projectBudget.trim() === "" ||
        !/^\d+$/.test(projectFormData.projectBudget)
      ) {
        toast.error("Please enter a valid project budget (numbers only)");
        return;
      }

      const res = await axios.post("/api/companyUser/add-project", {
        ...projectFormData,
        _id: currentClientData._id,
        email: currentClientData.email,
        name: currentClientData.name,
      });
      router.push("/company-projects");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Project creation failed");
    } finally {
      setProjectFormData({
        projectName: "",
        projectStatus: "",
        projectBudget: "",
      });
      setDataProcessing(false);
    }
  };

  const getClientData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/companyUser/getTargetClientData/${clientId}`
      );

      setCurrentClientData(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to get client data");
    } finally {
      setLoader(false);
    }
  }, [clientId]);

  const handleStatusChange = (value: string) => {
    setProjectFormData((prevData) => ({
      ...prevData,
      projectStatus: value,
    }));
  };

  useEffect(() => {
    if (currentClientData.email.trim() === "") {
      getClientData();
    } else if (currentClientData.email.trim() !== "") {
      setLoader(false);
    }
  }, [getClientData, currentClientData, clientId]);

  return (
    <CompanyUserLayout>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="container max-w-4xl mx-auto py-10 px-4">
          <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create New Project
              </CardTitle>
              <CardDescription>
                Add a new project for {currentClientData.name}
              </CardDescription>
            </CardHeader>
            <form onSubmit={addNewProject}>
              <CardContent className="space-y-6">
                {/* Client Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        value={currentClientData.name}
                        readOnly
                        className="bg-muted cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Client Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={currentClientData.email}
                        readOnly
                        className="bg-muted cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        name="projectName"
                        value={projectFormData.projectName}
                        onChange={handleOnChange}
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectStatus">Project Status</Label>
                      <Select
                        value={projectFormData.projectStatus}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger id="projectStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectBudget">Project Budget</Label>
                      <Input
                        id="projectBudget"
                        name="projectBudget"
                        value={projectFormData.projectBudget}
                        onChange={handleOnChange}
                        placeholder="Enter project budget"
                        required
                      />
                    </div>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Project
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </CompanyUserLayout>
  );
};

export default AddProjectForm;
